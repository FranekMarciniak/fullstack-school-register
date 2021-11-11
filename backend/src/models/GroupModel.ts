const { DataTypes } = require('sequelize');
import sequelize from '../utils/database';

export const Group = sequelize.define('groups', {
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
