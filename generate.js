const { faker } = require('@faker-js/faker');
const axios = require('axios');

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
    await axios.post('http://localhost:3000/sensor-data', mockData);
    console.log('Mock data sent:', mockData);
  } catch (error) {
    console.error('Error sending mock data:', error);
  }
};

// Generate mock data every 5 seconds
setInterval(postData, 5000);
