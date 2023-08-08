import { PostgresClient } from "../database/postgres";

export async function updateDb(): Promise<void> {
  try {
    await PostgresClient.client.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
      );
    
      CREATE TABLE IF NOT EXISTS rooms (
        room_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        capacity INTEGER NOT NULL,
        amenities TEXT
      );
    
      CREATE TABLE IF NOT EXISTS reservations (
        reservation_id SERIAL PRIMARY KEY,
        room_id INTEGER REFERENCES rooms(room_id) NOT NULL,
        user_id INTEGER REFERENCES users(user_id) NOT NULL,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL
      );
    `);
  } catch (error) {
    console.log(error);
  } finally {
    PostgresClient.client.release();
  }
}
