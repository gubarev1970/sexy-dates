const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(100)
      );
    `);
    console.log('Tabulka users byla vytvořena.');
  } catch (error) {
    console.error(error);
  }
};

createTable(); // Spusťte tento skript jednou pro vytvoření tabulky
