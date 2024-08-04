const { DataTypes } = require('sequelize');
const sequelize = require('./index');


module.exports = (sequelize, DataTypes) => {
    const SensorData = sequelize.define('SensorData', {
      vehicle_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sensor_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sensor_value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

return SensorData;

}
