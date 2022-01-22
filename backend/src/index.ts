import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import passportConfig from './utils/passport-config';
import authRouter from './routes/auth';
import usersRoutes from './routes/users';
import groupsRouter from './routes/groups';
import gradesRouter from './routes/grades';
import coursesRouter from './routes/courses';
import hoursRouter from './routes/hours';
import lessonsRouter from './routes/lessons';
import classroomsRouter from './routes/classrooms';
import daysRouter from './routes/days';
import { Group } from './models/GroupModel';
import { Course } from './models/CourseModel';
import { User } from './models/UserModel';
import { Grade } from './models/GradeModel';
import { Lesson } from './models/LessonModel';
import sequelize from './utils/database';
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
console.log(User, Group, Course, Grade, Lesson);
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY || 'secret',
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false,
    proxy: true,
    saveUninitialized: true,
  }),
);
app.use(cookieParser(process.env.SECRET_KEY || 'secret'));
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);
export { passport };

app.use('/api/sessions', authRouter);
app.use('/api/users', usersRoutes);
app.use('/api/groups', groupsRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/hours', hoursRouter);
app.use('/api/classrooms', classroomsRouter);
app.use('/api/lessons', lessonsRouter);
app.use('/api/days', daysRouter);
app.use('/api/grades', gradesRouter);
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
