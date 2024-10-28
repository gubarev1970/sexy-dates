const express = require('express');
const { Client } = require('pg'); // Import PostgreSQL klienta

const app = express();
const port = 3000;

const pool = new Pool({
  connectionString: process.env.db_url, // nebo jiný tvůj připojovací řetězec
  ssl: false // zde je SSL nastaveno na false
});


// Middleware pro parsování JSON těla požadavku
app.use(express.json());

// Připojení k databázi
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'db_url',
  password: 'Charalamba11@',
  port: 5432,
});

client.connect();

// Registrace uživatele
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
    res.status(201).send('Uživatel zaregistrován.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Chyba při registraci.');
  }
});

