import { Pool, PoolClient } from "pg";

export const PostgresClient = {
  client: undefined as unknown as PoolClient,
  pool: undefined as unknown as Pool,

  async connect(): Promise<void> {
    const user = process.env.POSTGRES_USER;
    const host = process.env.POSTGRES_HOST;
    const pass = process.env.POSTGRES_PASS;
    const database = process.env.POSTGRES_DATABASE;

    const pool = new Pool({
      user: user,
      password: pass,
      host: host,
      database: database,
    });

    const client = await pool.connect();

    this.pool = pool;
    this.client = client;
  },
};
