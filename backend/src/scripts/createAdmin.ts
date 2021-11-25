import sequelize from '../utils/database';
import { User } from '../models/UserModel';
import readlineSync from 'readline-sync';
import generateRandomPassword from '../utils/genpassword';
const bcrypt = require('bcryptjs');
const environment = process.env.NODE_ENV || 'development';

const createAdmin = async () => {
  try {
    const admin = await User.findOne({ where: { role: 'admin' } });
    if (admin) {
      console.log('already exists');
      return;
    }
  } catch (error) {
    console.log(error);
  }
  const username = readlineSync.question(
    'What do you want admin username to be? (for default credential press enter) ',
    { defaultInput: 'adminuser' },
  );
  const email = readlineSync.question('What do you want admin email to be? ');
  const password = readlineSync.question(
    'What do you want admin password to be? (for generating safe password press enter) ',
    { defaultInput: generateRandomPassword() },
  );
  if (username && password && email) {
    try {
      const userToSave = await User.build({
        username,
        password: await bcrypt.hash(password, 10),
        email,
        role: 'admin',
      });
      userToSave.save();
      console.log(username, ' ', email, ' ', password);
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  } else {
    console.log('wrong credentials');
    return;
  }
};
createAdmin();
