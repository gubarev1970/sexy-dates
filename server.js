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

const baseUrl = 'https://sexy-dates-25.onrender.com/'; // Ujistěte se, že to zahrnuje protokol
const path = 'a89fc48aedbf63a8d54b4b5e527b01d2/users';
const url = new URL(path, baseUrl); // Toto bude fungovat

const input = 'a89fc48aedbf63a8d54b4b5e527b01d2/users';
const fullUrl = input.startsWith('http') ? input : `https://sexy-dates-25.onrender.com/${input}`;
const request = new Request(fullUrl);

console.log(fullUrl); // Debugging line
const request = new Request(fullUrl);


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
