require('dotenv').config();

const express = require('express');
const { sensorRouter } = require("./src/routes/sensor");
const { sequelize } = require('./src/models');

const app = express();
app.use(express.json());

app.use("/api/v1", sensorRouter);

app.get('/', (req, res) => {
    res.send("Fleet Managment System");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate(); // Test the database connection
        await sequelize.sync({ alter: true }); // Sync models with the database

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit the process with failure
    }
};

startServer();
