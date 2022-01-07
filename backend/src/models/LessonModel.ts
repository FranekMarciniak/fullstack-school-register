const { DataTypes } = require('sequelize');
import sequelize from '../utils/database';
import { Group } from './GroupModel';
import { Course } from './CourseModel';
import { Hour } from './HoursModel';
import { Classroom } from './ClassroomModel';
import { Day } from './DayModel';

export const Lesson = sequelize.define('lessons', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

Course.hasMany(Lesson, { foreignKey: 'course_id' });
Lesson.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });

Hour.hasMany(Lesson, { foreignKey: 'hour_id' });
Lesson.belongsTo(Hour, { foreignKey: 'hour_id', as: 'hour' });

Classroom.hasMany(Lesson, { foreignKey: 'classroom_id' });
Lesson.belongsTo(Classroom, { foreignKey: 'classroom_id', as: 'classroom' });

Day.hasMany(Lesson, { foreignKey: 'day_id' });
Lesson.belongsTo(Day, { foreignKey: 'day_id', as: 'day' });
