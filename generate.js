const { faker } = require('@faker-js/faker');
const axios = require('axios');

const generateMockSensorData = () => {
  return {
    vehicle_id: faker.string.uuid(), // Use faker.string.uuid() for UUIDs
    timestamp: new Date().toISOString(),
    sensor_type: faker.helpers.arrayElement(['temperature', 'speed', 'location']), // Use faker.helpers.arrayElement()
    sensor_value: faker.number.float({ min: 0, max: 100 }), // Use faker.number.float() for numbers
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
