require('dotenv').config();

const { faker } = require('@faker-js/faker');
const axios = require('axios');

const HOST_SERVER = process.env.HOST_SERVER || 'http://localhost:3000';

const generateMockSensorData = () => {
  return {
    vehicle_id: faker.string.uuid(), 
    timestamp: new Date().toISOString(),
    sensor_type: faker.helpers.arrayElement(['GPS', 'Speed', 'Fuel Level']), 
    sensor_value: faker.number.float({ min: 0, max: 100 }).toString(), 
  };
};

const postData = async () => {
  const mockData = generateMockSensorData();
  try {
    await axios.post(`${HOST_SERVER}/sensor-data`, mockData);
    console.log('Mock data sent:', mockData);
  } catch (error) {
    console.error('Error sending mock data:', error);
  }
};

// Generate the mock data every 5 seconds
setInterval(postData, 5000);
