import { neon } from '@neondatabase/serverless';
import {
  initialCategories,
  initialProducts,
  initialHeroBanners,
  initialServices,
  initialProjects,
  initialPartners,
  initialSiteSettings,
  initialLeads,
} from './packages/shared/data/initialData.ts';

/**
 * Persistence layer for TANSO's admin-editable content, backed by Neon
 * Postgres over Neon's HTTP driver (no TCP/native bindings, which plays
 * well with Vercel's serverless function packaging).
 *
 * Design: one table per entity, each row storing the full object as JSONB
 * under a `data` column, keyed by the entity's own `id`. This mirrors the
 * shapes already defined in packages/shared/types and used throughout the
 * frontend, so no field-by-field column mapping is needed.
 */

type SqlFn = ReturnType<typeof neon>;

let sqlClient: SqlFn | null = null;

function getSql(): SqlFn {
  if (sqlClient) return sqlClient;

  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.POSTGRES_URL_NON_POOLING;

  if (!connectionString) {
    throw new Error(
      "Database ulanmagan: DATABASE_URL (yoki POSTGRES_URL) environment variable topilmadi. " +
      "Vercel dashboard -> Storage -> Create Database -> Postgres orqali ulang."
    );
  }

  sqlClient = neon(connectionString);
  return sqlClient;
}

const ROW_TABLES = [
  'categories',
  'products',
  'hero_banners',
  'services',
  'projects',
  'partners',
  'leads',
  'notifications',
] as const;

type RowTable = (typeof ROW_TABLES)[number];

let initPromise: Promise<void> | null = null;

/** Ensures tables exist and are seeded. Safe to call on every request. */
export function ensureDb(): Promise<void> {
  if (!initPromise) {
    initPromise = doInit().catch((err) => {
      // Allow a later request to retry instead of permanently wedging
      // this serverless instance on a transient connection failure.
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
}

async function doInit(): Promise<void> {
  const sql = getSql();

  for (const table of ROW_TABLES) {
    await sql.query(`
      CREATE TABLE IF NOT EXISTS ${table} (
        id TEXT PRIMARY KEY,
        seq SERIAL,
        data JSONB NOT NULL
      );
    `);
  }

  await sql.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id TEXT PRIMARY KEY DEFAULT 'main',
      data JSONB NOT NULL
    );
  `);

  await seedIfEmpty('categories', initialCategories as unknown as Record<string, unknown>[]);
  await seedIfEmpty('products', initialProducts as unknown as Record<string, unknown>[]);
  await seedIfEmpty('hero_banners', initialHeroBanners as unknown as Record<string, unknown>[]);
  await seedIfEmpty('services', initialServices as unknown as Record<string, unknown>[]);
  await seedIfEmpty('projects', initialProjects as unknown as Record<string, unknown>[]);
  await seedIfEmpty('partners', initialPartners as unknown as Record<string, unknown>[]);
  await seedIfEmpty('leads', initialLeads as unknown as Record<string, unknown>[]);

  const settingsRows = (await sql.query(`SELECT 1 FROM site_settings WHERE id = 'main'`)) as any[];
  if (settingsRows.length === 0) {
    await sql.query(`INSERT INTO site_settings (id, data) VALUES ('main', $1)`, [
      JSON.stringify(initialSiteSettings),
    ]);
  }

  const notifRows = (await sql.query(`SELECT 1 FROM notifications LIMIT 1`)) as any[];
  if (notifRows.length === 0) {
    const unread = (initialLeads as any[]).filter((l) => !l.isRead);
    for (const lead of unread) {
      const notif = {
        id: `notif-${lead.id}`,
        leadId: lead.id,
        title: 'Yangi so‘rov kelib tushdi',
        message: `${lead.fullName} (${lead.phone}) - ${lead.productName || 'Konsultatsiya'}`,
        createdAt: lead.createdAt,
        isRead: false,
      };
      await sql.query(
        `INSERT INTO notifications (id, data) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING`,
        [notif.id, JSON.stringify(notif)]
      );
    }
  }
}

async function seedIfEmpty(table: RowTable, rows: Record<string, unknown>[]): Promise<void> {
  const sql = getSql();
  const existing = (await sql.query(`SELECT 1 FROM ${table} LIMIT 1`)) as any[];
  if (existing.length > 0) return;
  for (const row of rows) {
    await sql.query(`INSERT INTO ${table} (id, data) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING`, [
      row.id,
      JSON.stringify(row),
    ]);
  }
}

/** Reads every row of a table as plain objects, in the given order. */
export async function getAll<T = any>(table: RowTable, orderBy: string = 'seq ASC'): Promise<T[]> {
  const sql = getSql();
  const rows = await sql.query(`SELECT data FROM ${table} ORDER BY ${orderBy}`);
  return (rows as any[]).map((r) => r.data as T);
}

export async function insertRow<T extends { id: string }>(table: RowTable, row: T): Promise<T> {
  const sql = getSql();
  await sql.query(`INSERT INTO ${table} (id, data) VALUES ($1, $2)`, [row.id, JSON.stringify(row)]);
  return row;
}

/** Merges `patch` into the existing row's data (shallow merge, like the old in-memory PATCH). */
export async function patchRow<T = any>(table: RowTable, id: string, patch: Record<string, unknown>): Promise<T | null> {
  const sql = getSql();
  const rows = await sql.query(`SELECT data FROM ${table} WHERE id = $1`, [id]);
  if ((rows as any[]).length === 0) return null;
  const updated = { ...(rows as any[])[0].data, ...patch };
  await sql.query(`UPDATE ${table} SET data = $2 WHERE id = $1`, [id, JSON.stringify(updated)]);
  return updated as T;
}

export async function deleteRow(table: RowTable, id: string): Promise<void> {
  const sql = getSql();
  await sql.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
}

export async function getSettings<T = any>(): Promise<T> {
  const sql = getSql();
  const rows = await sql.query(`SELECT data FROM site_settings WHERE id = 'main'`);
  return (rows as any[])[0]?.data as T;
}

export async function updateSettings<T = any>(patch: Record<string, unknown>): Promise<T> {
  const current = await getSettings<Record<string, unknown>>();
  const updated = { ...current, ...patch };
  const sql = getSql();
  await sql.query(`UPDATE site_settings SET data = $1 WHERE id = 'main'`, [JSON.stringify(updated)]);
  return updated as T;
}

/** Replaces the entire hero_banners table contents (matches the old PUT /api/banners semantics). */
export async function replaceAllBanners<T extends { id: string }>(banners: T[]): Promise<T[]> {
  const sql = getSql();
  const statements = [
    sql.query('DELETE FROM hero_banners'),
    ...banners.map((banner) =>
      sql.query(`INSERT INTO hero_banners (id, data) VALUES ($1, $2)`, [banner.id, JSON.stringify(banner)])
    ),
  ];
  await sql.transaction(statements);
  return banners;
}
