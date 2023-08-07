import * as yup from 'yup';
import { CATEGORIES } from '../constants';
import { TNoteData } from '../types';

const sanitizeString = (str: string) => {
  const withoutTags = str.replace(/(<([^>]+)>)/gi, '');
  const sanitized = withoutTags.replace(/[&<>"'`=]/g, '');
  return sanitized;
};

const idSchema = yup.string().uuid().required();

export const validateId = (id: string) => idSchema.validate(id);

const noteSchema = yup
  .object({
    name: yup
      .string()
      .transform((str) => sanitizeString(str))
      .trim()
      .min(3)
      .max(20),
    category: yup.mixed().oneOf(CATEGORIES),
    content: yup
      .string()
      .transform((str) => sanitizeString(str))
      .trim()
      .min(10)
      .max(250),
    isArchived: yup.boolean().notRequired(),
  })
  .required()
  .noUnknown();

export const validateNoteData = (data: TNoteData) =>
  noteSchema.validate(data, { stripUnknown: false });
