require('dotenv').config({ path: './.env.test' });

const request = require('supertest');
const express = require('express');
const { sensorRouter } = require('../src/routes/sensor');
const { sequelize } = require('../src/models');

const app = express();
app.use(express.json());
app.use('/api/v1', sensorRouter);

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Ensure the database is in a clean state
}, 10000);

afterAll(async () => {
  await sequelize.close(); // Close the database connection after tests
}, 10000);

describe('Test Sensor Routes', () => {
  it('should insert sensor data', async () => {
    const response = await request(app)
      .post('/api/v1/sensor-data')
      .send({
        vehicle_id: 'vehicle123',
        timestamp: '2024-08-04T12:00:00Z',
        sensor_type: 'temperature',
        sensor_value: 25.5
      });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Data inserted successfully');
  }, 10000);

  it('should get sensor data', async () => {
    // First, insert data to fetch
    await request(app)
      .post('/api/v1/sensor-data')
      .send({
        vehicle_id: 'vehicle123',
        timestamp: '2024-08-04T12:00:00Z',
        sensor_type: 'temperature',
        sensor_value: 25.5
      });

    const response = await request(app)
      .get('/api/v1/sensor-data')
      .query({
        vehicle_id: 'vehicle123'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('vehicle_id', 'vehicle123');
    expect(response.body[0]).toHaveProperty('sensor_type', 'temperature');
    expect(response.body[0]).toHaveProperty('sensor_value', 25.5);
  }, 10000);
});