const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Funkce pro přidání uživatele
const addUser = async (username, email, password) => {
  const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
  return result.rows[0];
};

// Funkce pro získání všech uživatelů
const getUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

module.exports = { addUser, getUsers };
const PORT = process.env.PORT || 10000; // Render automaticky přiřadí port
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
