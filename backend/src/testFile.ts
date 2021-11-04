import sequelize from './utils/database';

export async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
