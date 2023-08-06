import { DataTypes } from 'sequelize';
import { sequelize } from '../services/db.config';

export const Note = sequelize.define(
  'Note',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['Task', 'Random Thought', 'Idea'],
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dates: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'notes',
  }
);

(async () => {
  await sequelize.sync({ force: true }); // Sync the model with the database

  // Create a new note
  const newNote = await Note.create({
    name: 'New Note',
    category: 'Task',
    content: 'This is a new note.',
  });

  console.log(newNote);
})();
