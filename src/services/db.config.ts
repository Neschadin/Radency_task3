import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.POSTGRES_URI!, {
  define: { freezeTableName: true, timestamps: true, updatedAt: false },
});

// (async function () {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();
