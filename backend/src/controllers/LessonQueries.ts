import express from 'express';
import { Classroom } from '../models/ClassroomModel';
import { Course } from '../models/CourseModel';
import { Day } from '../models/DayModel';
import { Group } from '../models/GroupModel';
import { Hour } from '../models/HoursModel';
import { Lesson } from '../models/LessonModel';
import { User } from '../models/UserModel';
import { IUser } from '../types/user';
import _ from 'lodash';
import { Op } from 'sequelize';

export const lessonsQuery = async (
  req: express.Request,
  role: string,
  group?: string,
) => {
  const teacher = role === 'teacher' ? role : null;
  const student = role === 'student' ? role : null;

  return await Lesson.findAll({
    include: [
      {
        model: Course,
        as: 'course',
        required: true,
        include: [
          {
            model: User,
            as: 'teacher',
            required: true,
            attributes: { exclude: ['password'] },
            where: { [Op.and]: [teacher && { id: (req.user as IUser).id }] },
          },
          {
            model: Group,
            as: 'group',
            required: true,
            where: {
              [Op.and]: [student && { id: (req.user as IUser).id }],
              [Op.and]: [group && { id: group }],
            },
          },
        ],
      },
      { model: Hour, as: 'hour' },
      {
        model: Day,
        as: 'day',
        required: true,
      },
      { model: Classroom, as: 'classroom' },
    ],
  });
};
