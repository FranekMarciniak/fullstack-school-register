const { DataTypes } = require('sequelize');
import sequelize from '../utils/database';
import { Course } from './CourseModel';
import { User } from './UserModel';

export const Grade = sequelize.define('grades', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  description: {
    type: DataTypes.TEXT,
  },
});
User.hasMany(Grade, { foreignKey: 'student_id' });
Grade.belongsTo(User, { foreignKey: 'student_id' });

Course.hasMany(Grade, { foreignKey: 'course_id' });
Grade.belongsTo(Course, { foreignKey: 'course_id' });
