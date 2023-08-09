import { Pool, PoolClient } from "pg";

export const PostgresManager = {
  pool: undefined as unknown as Pool,

  createPool() {
    if (this.pool) {
      return;
    }

    this.pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
    });

    this.pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  },

  async query(sql: string, values?: any[]): Promise<any> {
    return await this.pool.query(sql, values);
  },

  async connect(): Promise<PoolClient> {
    return await this.pool.connect();
  },
};

export default PostgresManager;
