import db from "../db";

export async function updateDb(): Promise<void> {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
      );
    
      CREATE TABLE IF NOT EXISTS rooms (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        capacity INTEGER NOT NULL,
        amenities TEXT
      );
    
      CREATE TABLE IF NOT EXISTS reservations (
        id SERIAL PRIMARY KEY,
        room_id INTEGER REFERENCES rooms(id) NOT NULL,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL
      );
    `);
  } catch (error) {
    console.log(error);
  }
}
