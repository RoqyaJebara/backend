//connection to postgres database
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;//CONSTRUCTER POOL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

});

export default pool;