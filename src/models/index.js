const { Sequelize } = require('sequelize');
const config = require('../../config/config');

const environment = process.env.NODE_ENV || 'development';
const envConfig = config[environment];

const sequelize = new Sequelize({
  database: envConfig.database, 
  username:envConfig.username, 
  password:envConfig.password, 
  host: envConfig.host,
  dialect: envConfig.dialect,
  dialectOptions: envConfig.dialectOptions || null
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.SensorData = require('./sensorData')(sequelize, Sequelize.DataTypes);

module.exports = db;
