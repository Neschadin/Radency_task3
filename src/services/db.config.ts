import { Sequelize } from 'sequelize';
import { dbUri } from '../helpers';

export const sequelize = new Sequelize(dbUri!, {
  define: { updatedAt: false },
  logging: false,
});

(async () => await sequelize.sync({ alter: true }))();
