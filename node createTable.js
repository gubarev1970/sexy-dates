const { Pool } = require('pg');

// Připojení k databázi
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100)
      );
    `);
    console.log('Tabulka users byla vytvořena.');
  } catch (error) {
    console.error('Chyba při vytváření tabulky:', error);
  } finally {
    await pool.end(); // Uzavřete připojení po dokončení
  }
};

createTable(); // Spusťte tento skript jednou pro vytvoření tabulky
