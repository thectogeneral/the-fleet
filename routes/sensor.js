const { Router }  = require("express");

const sensorRouter = Router();

sensorRouter.post("/sensor-data", (req, res) => {
    res.send("hello");
});

sensorRouter.get("/sensor-data", (req, res) => {
    res.send("hello");
});

module.exports = { sensorRouter };