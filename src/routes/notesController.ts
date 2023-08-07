import { Request, Response } from 'express';
import { Note } from '../models/Note';
import { validateId, validateNoteData } from '../helpers/validator';
import { extractDates } from '../helpers/utils';

const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.findAll();

    res.status(200).json(notes);
  } catch ({ message }: any) {
    res.status(500).json({ error: message });
  }
};

const createNote = async (req: Request, res: Response) => {
  try {
    const validData = await validateNoteData(req.body);
    const dates = extractDates(validData.content!);
    const createdNote = await Note.create({ ...validData, dates });

    res.status(201).json(createdNote);
  } catch ({ message }: any) {
    res.status(400).json({ error: message });
  }
};

const getStats = async (req: Request, res: Response) => {
  try {
    const categories = await Note.findAll({
      attributes: ['category'],
      group: ['category'],
    });

    const stats = {} as {
      [category: string]: { active: number; archived: number };
    };

    await Promise.all(
      categories.map(async (item) => {
        const category = item.dataValues.category;

        const active = await Note.count({
          where: { category, isArchived: false },
        });

        const archived = await Note.count({
          where: { category, isArchived: true },
        });

        stats[category] = { active, archived };
      })
    );

    res.status(200).json(stats);
  } catch ({ message }: any) {
    res.status(500).json({ error: message });
  }
};

const getNote = async (req: Request, res: Response) => {
  try {
    const validId = await validateId(req.params.id);
    const note = await Note.findByPk(validId);

    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch ({ message }: any) {
    res.status(500).json({ error: message });
  }
};

const updatedNote = async (req: Request, res: Response) => {
  try {
    const validId = await validateId(req.params.id);
    const validData = await validateNoteData(req.body);
    const note = await Note.findByPk(validId);

    if (note) {
      const dates = extractDates(validData.content!);
      const updatedNote = await note.update({ ...validData, dates });

      res.status(202).json(updatedNote);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch ({ message }: any) {
    res.status(500).json({ error: message });
  }
};

const deleteNote = async (req: Request, res: Response) => {
  try {
    const validId = await validateId(req.params.id);
    const note = await Note.findByPk(validId);

    if (note) {
      await note.destroy();
      res.status(202).json({ deleted: note });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch ({ message }: any) {
    res.status(500).json({ error: message });
  }
};

export { getAllNotes, createNote, getStats, getNote, updatedNote, deleteNote };
