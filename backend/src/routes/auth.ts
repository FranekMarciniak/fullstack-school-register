import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/UserModel';
import { passport } from '../server';
const router = express.Router();
const { Op } = require('sequelize');

router.get('/', (req, res) => {
  res.send(req.user);
});

router.post('/', (req, res, next) => {
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

router.post('/register', async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username && password && email) {
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
      if (user) res.send('User exists');

      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userToSave = User.build({
          username,
          email,
          password: hashedPassword,
          firstName: 'franek',
          lastName: 'Marciniak',
          school_group_id: 1,
        });
        await userToSave.save();
        res.send('User created!');
      }
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send('missing credentials');
  }
});

export default router;
