import express from 'express';
import passport from 'passport';
import session from 'express-session';
// import cors from 'cors';
import passportConfig from './utils/passport-config';
import authRouter from './routes/auth';
import groupsRouter from './routes/groups';
import coursesRouter from './routes/courses';
import { Group } from './models/GroupModel';
import { Course } from './models/CourseModel';
import { User } from './models/UserModel';
import { Grade } from './models/GradeModel';
import { Lesson } from './models/LessonModel';
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;
console.log(User, Group, Course, Grade, Lesson);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(cookieParser('secret'));
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);
export { passport };

app.use('/auth', authRouter);
app.use('/groups', groupsRouter);
app.use('/courses', coursesRouter);
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
