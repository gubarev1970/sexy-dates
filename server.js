const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Zadejte databázový URL z Render.com
  ssl: { rejectUnauthorized: false } // Tento řádek použijte, pokud je databáze na serveru chráněná SSL
});

// Příklad dotazu: Vložení nového uživatele
const addUser = async (username, email, password) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
};
