import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.POSTGRES_URI!, {
  define: { updatedAt: false },
});

(async () => await sequelize.sync({ alter: true }))();
