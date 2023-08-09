import { Pool } from "pg";

export const PostgresClient = {
  db: undefined as unknown as Pool,

  async connect(): Promise<void> {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
    });

    this.db = pool;
  },
};
