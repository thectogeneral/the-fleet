require('dotenv').config();
const express = require('express');
const { sensorRouter } = require("./routes/sensor")

const app = express();
app.use(express.json());

app.use("/api/v1", sensorRouter);

app.get('/', async (req, res) => {
   res.send("Hello, World")
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});