const express = require('express'); // Import Express
const { Pool } = require('pg'); // Import Pool z pg
const { addUser, getUsers } = require('./userModel'); // Import funkcí z userModel.js

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // URL z Render.com
  ssl: { rejectUnauthorized: false }
});

const app = express(); // Inicializace Express aplikace
app.use(express.json()); // Middleware pro JSON

// Endpoint pro základní URL
app.get('/', (req, res) => {
  res.send('Aplikace běží!'); // Odpověď na požadavek na /
});

// Endpoint pro registraci uživatele
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

// Endpoint pro získání všech uživatelů
app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Chyba při získávání uživatelů');
  }
});

// Port pro naslouchání
const PORT = process.env.PORT || 10000; // Render automaticky přiřadí port
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
