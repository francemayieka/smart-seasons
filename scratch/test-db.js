const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.DATABASE_URL.replace('data-eng-france.e.aivencloud.com', '157.245.204.45');
console.log('Testing connection to IP:', '157.245.204.45');

const pool = new Pool({
  connectionString: connectionString.split('?')[0], // Strip parameters
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 20000,
});

async function test() {
  try {
    const start = Date.now();
    const client = await pool.connect();
    console.log('Connected successfully in', Date.now() - start, 'ms');
    const res = await client.query('SELECT NOW()');
    console.log('Query result:', res.rows[0]);
    client.release();
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await pool.end();
  }
}

test();
