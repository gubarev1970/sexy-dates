const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Zadejte databázový URL z Render.com
  ssl: { rejectUnauthorized: false } // Tento řádek použijte, pokud je databáze na serveru chráněná SSL
});

// Příklad dotazu: Vložení nového uživatele
const addUser = async (username, email, password) => {
  try {
   pool.connect()
  .then(() => {
    console.log('Úspěšné připojení k databázi');
    pool.end();
  })
  .catch(err => {
    console.error('Chyba při připojování k databázi', err);
  });
