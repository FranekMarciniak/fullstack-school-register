const { DataTypes } = require('sequelize');
import sequelize from '../utils/database';

export const Day = sequelize.define('day', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dayNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
