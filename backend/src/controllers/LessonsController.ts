import * as express from 'express';
import { Course } from '../models/CourseModel';
import { validationResult } from 'express-validator';
import {
  clientError,
  fail,
  notFound,
  succsess,
  succsesJson,
  conflict,
} from './BaseController';
import { Lesson } from '../models/LessonModel';
import { Hour } from '../models/HoursModel';
import { Classroom } from '../models/ClassroomModel';
import { Op } from 'sequelize';
import { Day } from '../models/DayModel';
import { lessonsQuery } from './LessonQueries';
import { IUser } from '../types/user';
import _ from 'lodash';

const getLessons = async (req: express.Request, res: express.Response) => {
  try {
    return res
      .status(200)
      .json(await lessonsQuery(req, (req.user as IUser).role));
  } catch (err) {
    fail(res, err as Error);
  }
};

const getLessonsForAllDays = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    return res
      .status(200)
      .json(
        _.groupBy(
          await lessonsQuery(req, (req.user as IUser).role),
          'day.dayNumber',
        ),
      );
  } catch (err) {
    fail(res, err as Error);
  }
};

const getLessonsForGroup = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    return res
      .status(200)
      .json(
        _.groupBy(
          await lessonsQuery(req, (req.user as IUser).role, req.params.group),
          'day.dayNumber',
        ),
      );
  } catch (err) {
    fail(res, err as Error);
  }
};

const postLesson = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { day_id, course_id, hour_id, classroom_id } = req.body;

  try {
    const course = await Course.findByPk(course_id);
    const hour = await Hour.findByPk(hour_id);
    const clasroom = await Classroom.findByPk(classroom_id);
    const day = await Day.findByPk(day_id);
    if (!day || !course || !hour || !clasroom) {
      return notFound(res, 'Please enter correct data');
    }
    const teacher_id = course.get('teacher_id');
    const group_id = course.get('group_id');
    const isGroupBusy = await Lesson.findOne({
      include: [
        {
          model: Course,
          as: 'course',
          required: true,
          where: { group_id: { [Op.eq]: group_id } },
        },
      ],
      where: { [Op.and]: [{ hour_id: hour_id }, { day_id: day_id }] },
    });
    if (isGroupBusy) return conflict(res, 'This group is busy at this time');
    const isTeacherBusy = await Lesson.findOne({
      include: [
        {
          model: Course,
          as: 'course',
          required: true,
          where: { teacher_id: { [Op.eq]: teacher_id } },
        },
      ],
      where: { [Op.and]: [{ hour_id: hour_id }, { day_id: day_id }] },
    });
    if (isTeacherBusy)
      return conflict(res, 'This teacher is busy at this time');
    const isClassroomBusy = await Lesson.findOne({
      where: {
        [Op.and]: [
          { hour_id: hour_id },
          { day_id: day_id },
          { classroom_id: classroom_id },
        ],
      },
    });
    if (isClassroomBusy)
      return conflict(res, 'This classroom is busy at this time');
    const lessonToCreate = await Lesson.build({
      day_id,
      classroom_id,
      course_id,
      hour_id,
    });
    lessonToCreate.save();
    return succsesJson(res, 201, 'Course created', lessonToCreate);
  } catch (err) {
    return fail(res, err as Error);
  }
};

const deleteLesson = async (req: express.Request, res: express.Response) => {
  try {
    const lessonToDelete = await Lesson.findByPk(req.params.id);
    if (!lessonToDelete) {
      return notFound(res, 'Lesson not found');
    }
    await lessonToDelete.destroy();
    return succsess(res, 200, 'Lesson deleted');
  } catch (err) {
    return fail(res, err as Error);
  }
};

export default {
  getLessons,
  getLessonsForAllDays,
  getLessonsForGroup,
  postLesson,
  deleteLesson,
};
