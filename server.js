const express = require('express');
const cors = require('cors'); // Přidejte toto
const { Pool } = require('pg');
const { addUser, getUsers } = require('./userModel');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const app = express();
app.use(cors()); // Přidejte toto
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Aplikace běží!');
});

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

app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Chyba při získávání uživatelů');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
  console.log(`Přístup na http://localhost:${PORT}`);
});
