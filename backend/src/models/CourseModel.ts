const { DataTypes } = require('sequelize');
import sequelize from '../utils/database';

export const Course = sequelize.define('courses', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  group_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'groups',
      key: 'id',
    },
  },
});
