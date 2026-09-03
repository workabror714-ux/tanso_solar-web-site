import pg from 'pg';

const { Pool } = pg;

let pool: pg.Pool | null = null;

/**
 * Returns a singleton Postgres connection pool.
 *
 * Reads the connection string from whichever env var Vercel's Postgres
 * (Neon) integration injects. Vercel typically provides several aliases
 * pointing at the same database — we try the pooled one first since this
 * runs inside short-lived serverless functions.
 */
export function getPool(): pg.Pool {
  if (pool) return pool;

  const connectionString =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING;

  if (!connectionString) {
    throw new Error(
      "Database ulanmagan: POSTGRES_URL (yoki DATABASE_URL) environment variable topilmadi. " +
      "Vercel dashboard -> Storage -> Create Database -> Postgres orqali ulang."
    );
  }

  const needsSsl =
    connectionString.includes('sslmode=require') ||
    connectionString.includes('neon.tech') ||
    connectionString.includes('vercel-storage.com');

  pool = new Pool({
    connectionString,
    ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
    max: 5,
    idleTimeoutMillis: 10_000,
  });

  return pool;
}
