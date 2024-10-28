const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { addUser, getUsers } = require('./userModel');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const app = express();
app.use(cors());
app.use(express.json());

// Kořenová cesta
app.get('/', (req, res) => {
  res.send('Server běží. Přístupné cesty: /register, /users');
});

// Registrace uživatele
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await addUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Chyba při registraci');
  }
});

// Získání uživatelů
app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Chyba při získávání uživatelů');
  }
});

// Spuštění serveru
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
