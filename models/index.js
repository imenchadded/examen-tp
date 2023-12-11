const Sequelize = require('sequelize');

// Configuration de la connexion à la base de données
const sequelize = new Sequelize('miniproject', 'postgres', 'chadded223', {
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,    // Ajoutez d'autres options de configuration au besoin
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importez vos modèles ici
db.Profs = require('./profs')(sequelize, Sequelize);

module.exports = db;

