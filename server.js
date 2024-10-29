const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 10000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_url',
  password: 'Charalamba11@', // zde vlož své heslo
  port: 5432,
});

const BASE_URL = process.env.db_url || 'http://localhost:10000';

fetch(`${BASE_URL}/users`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Chyba při načítání uživatelů:', error));


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
