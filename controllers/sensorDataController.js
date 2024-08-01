const { SensorData } = require('../models/index');

const insertSensorData = async (req, res) => {
  res.send("Hello, World")
};

const getSensorData = async (req, res) => {
  res.send("Hello, World")
};

module.exports = {
  insertSensorData,
  getSensorData,
};
