import { drizzle } from 'drizzle-orm/neon-http';

let _db: ReturnType<typeof drizzle> | null = null;

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop, receiver) {
    if (!_db) {
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not set in environment variables');
      }
      _db = drizzle(process.env.DATABASE_URL);
    }
    return Reflect.get(_db, prop, receiver);
  },
});
