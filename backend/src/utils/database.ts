import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('testdb', 'postgres', 'example', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5431,
  logging: false,
});

export default sequelize;
