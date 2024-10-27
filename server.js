const express = require('express');
const { Pool } = require('pg');
const { addUser, getUsers } = require('./userModel');

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Endpoint pro registraci uživatele
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await addUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Chyba při registraci', error);
    res.status(500).send('Chyba při registraci');
  }
});

// Endpoint pro získání všech uživatelů
app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Chyba při získávání uživatelů', error);
    res.status(500).send('Chyba při získávání uživatelů');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
