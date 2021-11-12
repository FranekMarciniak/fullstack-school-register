const { DataTypes } = require('sequelize');
import sequelize from '../utils/database';

export const Hour = sequelize.define('hours', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  periodNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  intervalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
