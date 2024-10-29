const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_url',
  password: 'tvé_heslo', // zde vlož své heslo
  port: 5432,
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.get('/users', async (req, res) => {
  try {
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).send("Chyba při načítání uživatelů");
  }
});
fetch('/users')
  .then(response => response.json())
  .then(data => {
    // Logika pro zobrazení uživatelů
  })
  .catch(error => console.error("Chyba při načítání uživatelů:", error));
