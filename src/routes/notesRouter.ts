import express from 'express';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  getStats,
  updatedNote,
} from './notesController';

const notesRouter = express.Router();

notesRouter.get('/', getAllNotes);
notesRouter.post('/', createNote);
notesRouter.get('/stats', getStats);
notesRouter.get('/:id', getNote);
notesRouter.patch('/:id', updatedNote);
notesRouter.delete('/:id', deleteNote);

export { notesRouter };
