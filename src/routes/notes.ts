import express from 'express';
import { Note } from '../models/Note';
import { sequelize } from '../services/db.config';
import { validator } from '../helpers';

const notesRouter = express.Router();

// POST /notes
notesRouter.post('/', async (req, res) => {
  try {
    const data = req.body;
    const clearData = await validator(data);
    const createdNote = await Note.create(clearData);
    res.status(201).json(createdNote);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// GET /notes
notesRouter.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /notes/:id
notesRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findByPk(id);

    if (!note) {
      res.status(404).json({ error: 'Note not found' });
    } else {
      res.json(note);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /notes/:id
notesRouter.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findByPk(id);

    if (!note) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }

    const updatedNote = req.body;
    const clearUpdatedNote = await validator(updatedNote);

    await note.update(clearUpdatedNote);
    res.json(clearUpdatedNote);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /notes/:id
notesRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findByPk(id);
    console.log('11111', note);

    if (!note) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }

    res.status(404).json({ note });
    await note.destroy();
    res.status(404).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /notes/stats
notesRouter.get('/stats', async (req, res) => {
  try {
    const stats = await Note.findAll({
      attributes: [
        'category',
        [sequelize.fn('count', sequelize.col('id')), 'total'],
        [sequelize.fn('sum', sequelize.col('archived')), 'archived'],
      ],
      group: ['category'],
    });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { notesRouter };
