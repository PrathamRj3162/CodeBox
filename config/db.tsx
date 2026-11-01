import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle(
  process.env.DATABASE_URL ||
    'postgresql://placeholder:placeholder@placeholder.neon.tech/neondb?sslmode=require'
);
