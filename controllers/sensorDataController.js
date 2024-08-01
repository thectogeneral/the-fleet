const { SensorData } = require('../models/index');

const insertSensorData = async (req, res) => {
  const { vehicle_id, timestamp, sensor_type, sensor_value } = req.body;
  try {
    await SensorData.create({ vehicle_id, timestamp, sensor_type, sensor_value });
    res.status(200).send('Data inserted successfully');
  } catch (error) {
    res.status(400).send('Error inserting data');
  }
};

const getSensorData = async (req, res) => {
  const { vehicle_id, sensor_type, start_time, end_time } = req.query;
  try {
    const result = await SensorData.findAll({
      where: {
        ...(vehicle_id && { vehicle_id }),
        ...(sensor_type && { sensor_type }),
        ...(start_time && { timestamp: { [Op.gte]: new Date(start_time) } }),
        ...(end_time && { timestamp: { [Op.lte]: new Date(end_time) } }),
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send('Error fetching data');
  }
};

module.exports = {
  insertSensorData,
  getSensorData,
};
