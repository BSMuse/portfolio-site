import { Pool } from 'pg';
import 'dotenv/config';

console.log('Connecting to:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  application_name: 'portfolio-backend'
});

// Test the connection
pool.on('connect', () => {
  console.log('✅ Connected to database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

export default pool; 