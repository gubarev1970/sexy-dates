const { Pool } = require('pg');

// Zde zadejte údaje pro připojení k databázi
const pool = new Pool({
  user: 'yourUsername',       // Zadejte uživatelské jméno pro databázi
  host: 'yourHost',           // Zadejte hostitele (např. localhost nebo IP adresa)
  database: 'yourDatabase',   // Zadejte název databáze
  password: 'yourPassword',    // Zadejte heslo pro databázi
  port: 5432,                  // Zadejte port, na kterém databáze naslouchá (default: 5432)
});

// Funkce pro přidání uživatele
const addUser = async (username, email, password) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;  // Vrátí chybu, aby bylo možné ji zpracovat v server.js
  }
};

// Funkce pro získání všech uživatelů
const getUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;  // Vrátí chybu, aby bylo možné ji zpracovat v server.js
  }
};

module.exports = { addUser, getUsers };