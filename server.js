const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Zajišťuje, že index.html je ve stejném adresáři
});

app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});
