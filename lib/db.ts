import { createClient, Client } from '@libsql/client';

let _db: Client | null = null;

export function getDb(): Client {
  if (!_db) {
    const url = process.env.TURSO_DATABASE_URL;
    if (!url) {
      throw new Error('TURSO_DATABASE_URL is not set');
    }
    _db = createClient({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN ?? '',
    });
  }
  return _db;
}

export const db = {
  execute: (sql: string | { sql: string; args: unknown[] }) => {
    return getDb().execute(sql);
  },
};
