import express from 'express';
import { Sequelize } from 'sequelize';
import passport from 'passport';
// import { test } from './testFile';

export const sequelize = new Sequelize('testdb', 'postgres', 'example', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5431,
});

const app = express();

const PORT = 3000;

app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`[server]: Serer is running at https://localhost:${PORT}`);
});
