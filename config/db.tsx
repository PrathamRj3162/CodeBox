import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://placeholder:placeholder@placeholder-pooler.neon.tech/neondb?sslmode=require';

const sql = neon(connectionString);
export const db = drizzle(sql);
