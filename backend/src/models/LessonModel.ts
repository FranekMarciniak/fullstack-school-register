const { DataTypes } = require('sequelize');
import sequelize from '../utils/database';
import { Group } from './GroupModel';
import { Course } from './CourseModel';
import { Hour } from './HoursModel';
import { Classroom } from './ClassroomModel';

export const Lesson = sequelize.define('lessons', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  day: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Course.hasMany(Lesson, { foreignKey: 'course_id' });
Lesson.belongsTo(Course, { foreignKey: 'course_id' });

Hour.hasMany(Lesson, { foreignKey: 'hour_id' });
Lesson.belongsTo(Hour, { foreignKey: 'hour_id' });

Classroom.hasMany(Lesson, { foreignKey: 'classroom_id' });
Lesson.belongsTo(Classroom, { foreignKey: 'classroom_id' });
