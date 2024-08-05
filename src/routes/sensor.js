const { Router }  = require("express");
const { insertSensorData, getSensorData } = require('../controllers/sensorDataController');

const sensorRouter = Router();

sensorRouter.post("/", insertSensorData);
sensorRouter.get("/", getSensorData);

module.exports = { sensorRouter };