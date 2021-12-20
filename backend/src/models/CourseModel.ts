const { DataTypes } = require('sequelize');
import sequelize from '../utils/database';
import { Group } from './GroupModel';
import { User } from './UserModel';

export const Course = sequelize.define('courses', {
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
User.hasMany(Course, { foreignKey: 'teacher_id' });
Course.belongsTo(User, { foreignKey: 'teacher_id', as: 'teacher' });

Group.hasMany(Course, { foreignKey: 'group_id' });
Course.belongsTo(Group, { foreignKey: 'group_id', as: 'group' });
