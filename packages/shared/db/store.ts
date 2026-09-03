import { getPool } from './client';
import {
  initialCategories,
  initialProducts,
  initialHeroBanners,
  initialServices,
  initialProjects,
  initialPartners,
  initialSiteSettings,
  initialLeads,
} from '../data/initialData';

/**
 * Persistence layer for TANSO's admin-editable content.
 *
 * Design: one Postgres table per entity, each row storing the full object
 * as JSONB under a `data` column, keyed by the entity's own `id`. This
 * mirrors the exact shapes already defined in packages/shared/types and
 * used throughout the frontend, so no field-by-field column mapping is
 * needed and the API's response shapes stay unchanged.
 *
 * A `seq` column (insertion order) backs the "newest first" ordering that
 * the in-memory version got for free from Array.unshift().
 */

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
  const pool = getPool();

  for (const table of ROW_TABLES) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${table} (
        id TEXT PRIMARY KEY,
        seq SERIAL,
        data JSONB NOT NULL
      );
    `);
  }

  await pool.query(`
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

  const { rows: settingsRows } = await pool.query(`SELECT 1 FROM site_settings WHERE id = 'main'`);
  if (settingsRows.length === 0) {
    await pool.query(`INSERT INTO site_settings (id, data) VALUES ('main', $1)`, [
      JSON.stringify(initialSiteSettings),
    ]);
  }

  const { rows: notifRows } = await pool.query(`SELECT 1 FROM notifications LIMIT 1`);
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
      await pool.query(
        `INSERT INTO notifications (id, data) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING`,
        [notif.id, JSON.stringify(notif)]
      );
    }
  }
}

async function seedIfEmpty(table: RowTable, rows: Record<string, unknown>[]): Promise<void> {
  const pool = getPool();
  const { rows: existing } = await pool.query(`SELECT 1 FROM ${table} LIMIT 1`);
  if (existing.length > 0) return;
  for (const row of rows) {
    await pool.query(`INSERT INTO ${table} (id, data) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING`, [
      row.id,
      JSON.stringify(row),
    ]);
  }
}

/** Reads every row of a table as plain objects, in the given order. */
export async function getAll<T = any>(table: RowTable, orderBy: string = 'seq ASC'): Promise<T[]> {
  const pool = getPool();
  const { rows } = await pool.query(`SELECT data FROM ${table} ORDER BY ${orderBy}`);
  return rows.map((r) => r.data as T);
}

export async function insertRow<T extends { id: string }>(table: RowTable, row: T): Promise<T> {
  const pool = getPool();
  await pool.query(`INSERT INTO ${table} (id, data) VALUES ($1, $2)`, [row.id, JSON.stringify(row)]);
  return row;
}

/** Merges `patch` into the existing row's data (shallow merge, like the old in-memory PATCH). */
export async function patchRow<T = any>(table: RowTable, id: string, patch: Record<string, unknown>): Promise<T | null> {
  const pool = getPool();
  const { rows } = await pool.query(`SELECT data FROM ${table} WHERE id = $1`, [id]);
  if (rows.length === 0) return null;
  const updated = { ...rows[0].data, ...patch };
  await pool.query(`UPDATE ${table} SET data = $2 WHERE id = $1`, [id, JSON.stringify(updated)]);
  return updated as T;
}

/** Replaces the row's data outright (used for PUT). Returns null if the row doesn't exist. */
export async function replaceRowData<T = any>(table: RowTable, id: string, data: Record<string, unknown>): Promise<T | null> {
  const pool = getPool();
  const { rows } = await pool.query(`SELECT id FROM ${table} WHERE id = $1`, [id]);
  if (rows.length === 0) return null;
  await pool.query(`UPDATE ${table} SET data = $2 WHERE id = $1`, [id, JSON.stringify(data)]);
  return data as T;
}

export async function deleteRow(table: RowTable, id: string): Promise<void> {
  const pool = getPool();
  await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
}

export async function getSettings<T = any>(): Promise<T> {
  const pool = getPool();
  const { rows } = await pool.query(`SELECT data FROM site_settings WHERE id = 'main'`);
  return rows[0]?.data as T;
}

export async function updateSettings<T = any>(patch: Record<string, unknown>): Promise<T> {
  const pool = getPool();
  const current = await getSettings<Record<string, unknown>>();
  const updated = { ...current, ...patch };
  await pool.query(`UPDATE site_settings SET data = $1 WHERE id = 'main'`, [JSON.stringify(updated)]);
  return updated as T;
}

/** Replaces the entire hero_banners table contents (matches the old PUT /api/banners semantics). */
export async function replaceAllBanners<T extends { id: string }>(banners: T[]): Promise<T[]> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM hero_banners');
    for (const banner of banners) {
      await client.query(`INSERT INTO hero_banners (id, data) VALUES ($1, $2)`, [
        banner.id,
        JSON.stringify(banner),
      ]);
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
  return banners;
}
