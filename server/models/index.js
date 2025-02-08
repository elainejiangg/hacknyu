'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); // Ensure .env is loaded

const basename = path.basename(__filename); // index.js
// console.log('node env:', process.env.NODE_ENV)
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const db = {};
let sequelize;

console.log("config: ", config)

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    host: config.host,
    port: config.port,
  });
}

// Confirm database connection
sequelize.authenticate().then(() => {
  console.log('Successful connection to the database.');
}).catch((err) => {
  console.error('Error connecting to the database:', err);
});

// Dynamically load all models in the current directory
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && // Exclude hidden files
      file !== basename && // Exclude index.js itself
      file.slice(-3) === '.js' // Include only .js files
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Set up associations if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

console.log('Loaded models:', Object.keys(db)); // Log loaded models for debugging

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
