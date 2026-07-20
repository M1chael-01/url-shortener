import { Pool } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("Chybí konfigurace DATABASE_URL v souboru .env!");
}

export const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 15000,
  connectionTimeoutMillis: 5000,
});

export async function sql(query: string, params: any[] = []) {
  const client = await dbPool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
}

async function initDatabaseSchema() {
  const client = await dbPool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS urls (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        short_code VARCHAR(10) UNIQUE NOT NULL,
        original_url TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_urls_short_code ON urls(short_code);
    `);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}

initDatabaseSchema();
