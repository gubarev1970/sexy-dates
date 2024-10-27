// Importy
const express = require('express'); // Import Express
const { Pool } = require('pg'); // Import Pool z pg
const { addUser, getUsers } = require('./userModel'); // Import funkcí z userModel.js

// Inicializace Express aplikace
const app = express(); 
app.use(express.json()); // Middleware pro JSON

// Inicializace Pool pro PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // URL z Render.com
  ssl: { rejectUnauthorized: false }
});

// Základní GET endpoint
app.get('/', (req, res) => {
  res.send('Aplikace běží!'); // Odpověď na GET /
});

// Registrace uživatele (POST)
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

// Získání uživatelů (GET)
app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Chyba při získávání uživatelů');
  }
});

// Naslouchání na portu
const PORT = process.env.PORT || 10000; // Render automaticky přiřadí port
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
