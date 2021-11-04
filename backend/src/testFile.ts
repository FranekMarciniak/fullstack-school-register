import { sequelize } from './server';

export async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
