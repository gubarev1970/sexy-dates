const path = require('path');

// Endpoint pro kořenovou URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const { Pool } = require('pg');
const express = require('express');
const { addUser, getUsers } = require('./userModel'); // Import funkcí z userModel.js

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const app = express();
app.use(express.json());

// Endpoint pro kořenovou URL
app.get('/', (req, res) => {
  res.send('Aplikace běží!');
});

// Endpoint pro registraci uživatele
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await addUser(username, email, password);
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(500).send('Chyba při registraci');
  }
});

// Endpoint pro získání všech uživatelů
app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
