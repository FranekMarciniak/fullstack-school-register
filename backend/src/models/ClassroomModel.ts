const { DataTypes } = require('sequelize');
import sequelize from '../utils/database';

export const Classroom = sequelize.define('classrooms', {
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
});
