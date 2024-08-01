const { Router }  = require("express");
const { insertSensorData, getSensorData } = require('../controllers/sensorDataController');

const sensorRouter = Router();

sensorRouter.post("/sensor-data", insertSensorData);
sensorRouter.get("/sensor-data", getSensorData);

module.exports = { sensorRouter };