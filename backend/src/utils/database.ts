import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('testdb', 'postgres', 'example', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5431,
});

export default sequelize;
