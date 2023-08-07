import { DataTypes } from 'sequelize';
import { sequelize } from '../services/db.config';
import { CATEGORIES } from '../constants';
import { formattedDate } from '../helpers/utils';

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
      values: CATEGORIES,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dates: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return formattedDate(this.dataValues.createdAt);
      },
    },
  },
  {
    tableName: 'notes',
  }
);
