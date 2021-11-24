import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
const environment = process.env.NODE_ENV || 'development';

dotenv.config();
const config = {
  db_name: process.env.DB_NAME || 'testdb',
  db_username: process.env.DB_USERNAME || 'postgres',
  db_password: process.env.DB_PASSWORD || 'example',
  db_host: process.env.DB_HOST || 'localhost',
  db_port: Number(process.env.DB_PORT) || 5431,
};
let sequelize: any;
if (environment === 'development') {
  sequelize = new Sequelize(
    config.db_name,
    config.db_username,
    config.db_password,
    {
      host: config.db_host,
      dialect: 'postgres',
      port: config.db_port,
      logging: false,
      omitNull: true,
    },
  );
} else if (environment === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL || '');
}

export default sequelize;
