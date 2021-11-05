import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
const { Op } = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

import passportConfig from './utils/passport-config';
import { User } from './models/UserModel';

const app = express();
const PORT = 4000;

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

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send(info);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send('Successfully Authenticated');
      });
    }
  })(req, res, next);
});

app.post('/register', async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username && password && email) {
    console.log(username, password, email);
    res.send('looks cool');
  } else {
    res.send('missing credentials');
  }
});

app.get('/user', (req, res) => {
  res.send(req.user);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
