// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('manager_de_contacte', '2dloly', 'qwerty123', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
