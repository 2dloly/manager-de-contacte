// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const contactRoutes = require('./routes/contacts');

const app = express();

// Ruta pentru calea rădăcină
app.get('/', (req, res) => {
    res.send('Bine ați venit la API-ul Manager de Contacte');
});

// Middleware pentru parsarea corpului cererilor
app.use(bodyParser.json());

// Rutele pentru contact
app.use('/contacts', contactRoutes);

// Sincronizarea cu baza de date și pornirea serverului
sequelize
    .sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Serverul rulează pe portul 3000');
        });
    })
    .catch((err) => {
        console.error('Eroare la conectarea la baza de date:', err);
    });
