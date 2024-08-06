const { SensorData } = require('../models/index');
const { Op } = require('sequelize'); // Import Op for advanced querying
const Joi = require('joi'); // For validation

// Validation schema for inserting sensor data
const sensorDataSchema = Joi.object({
  vehicle_id: Joi.string().required(),
  timestamp: Joi.date().required(),
  sensor_type: Joi.string().required(),
  sensor_value: Joi.string().required()
});

const insertSensorData = async (req, res) => {
  const { vehicle_id, timestamp, sensor_type, sensor_value } = req.body;

  // Validate request body
  const { error } = sensorDataSchema.validate({ vehicle_id, timestamp, sensor_type, sensor_value: sensor_value.toString()});
  if (error) {
    return res.status(400).send(`Validation error: ${error.details[0].message}`);
  }

  try {
    await SensorData.create({ vehicle_id, timestamp, sensor_type, sensor_value });
    res.status(201).send('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal server error');
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

    if (result.length === 0) {
      return res.status(404).send('No data found');
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  insertSensorData,
  getSensorData,
};
