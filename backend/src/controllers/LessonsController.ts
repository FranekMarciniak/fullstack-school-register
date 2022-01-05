import * as express from 'express';
import { Course } from '../models/CourseModel';
import { validationResult } from 'express-validator';
import { User } from '../models/UserModel';
import { Group } from '../models/GroupModel';
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

const getLessons = async (req: express.Request, res: express.Response) => {
  try {
    const allCourses = await Lesson.findAll({
      include: [
        { model: Course, as: 'course' },
        { model: Hour, as: 'hour' },
        { model: Classroom, as: 'classroom' },
      ],
    });
    return res.status(200).json(allCourses);
  } catch (err) {
    fail(res, err as Error);
  }
};

const postLesson = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return clientError(res, errors.array()[0].msg);
  }
  const { day, course_id, hour_id, classroom_id } = req.body;

  try {
    const course = await Course.findByPk(course_id);
    const hour = await Hour.findByPk(hour_id);
    const clasroom = await Classroom.findByPk(classroom_id);
    if (!course || !hour || !clasroom) {
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
      where: { [Op.and]: [{ hour_id: hour_id }, { day: day }] },
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
      where: { [Op.and]: [{ hour_id: hour_id }, { day: day }] },
    });
    if (isTeacherBusy)
      return conflict(res, 'This teacher is busy at this time');
    const isClassroomBusy = await Lesson.findOne({
      where: {
        [Op.and]: [
          { hour_id: hour_id },
          { day: day },
          { classroom_id: classroom_id },
        ],
      },
    });
    if (isClassroomBusy)
      return conflict(res, 'This classroom is busy at this time');
    const lessonToCreate = await Lesson.build({
      day,
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

const deleteCourse = async (req: express.Request, res: express.Response) => {
  try {
    const courseToDelete = await Course.findByPk(req.params.id);
    if (!courseToDelete) {
      return notFound(res, 'Course not found');
    }
    await courseToDelete.destroy();
    return succsess(res, 200, 'Course deleted');
  } catch (err) {
    return fail(res, err as Error);
  }
};

export default { getLessons, postLesson, deleteCourse };
