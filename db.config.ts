import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.PG_DB!,
  process.env.PG_USER!,
  process.env.PG_PASS!,
  {
    host: process.env.PG_HOST!,
    dialect: 'postgres',
  }
);
