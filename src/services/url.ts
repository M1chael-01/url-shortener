import { sql } from "../database/neon.ts";
interface UrlRecord {
  shortCode: string;
  originalUrl: string;
}

export const urlService = {
  async createShortUrl(originalUrl: string): Promise<UrlRecord> {
    const shortCode = Math.random().toString(36).substring(2, 8);

    try {
      await sql("INSERT INTO urls (short_code, original_url) VALUES ($1, $2)", [
        shortCode,
        originalUrl,
      ]);

      return { shortCode, originalUrl };
    } catch (error: any) {
      if (error.code === "23505") {
        return this.createShortUrl(originalUrl);
      }
      throw error;
    }
  },

  async getOriginalUrl(shortCode: string): Promise<string | null> {
    const rows = await sql(
      "SELECT original_url FROM urls WHERE short_code = $1 LIMIT 1",
      [shortCode],
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    const firstRow = rows[0] as { original_url: string };
    return firstRow.original_url;
  },
};
