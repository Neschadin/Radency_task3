import express from 'express';

import { noteController } from './notesController';

const notesRouter = express.Router();

notesRouter.get('/', noteController.getAllNotes);
notesRouter.post('/', noteController.createNote);
notesRouter.get('/stats', noteController.getStats);
notesRouter.get('/:id', noteController.getNote);
notesRouter.patch('/:id', noteController.updatedNote);
notesRouter.delete('/:id', noteController.deleteNote);

export { notesRouter };
