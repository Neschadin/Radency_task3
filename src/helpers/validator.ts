import * as yup from 'yup';

const sanitizeString = (str: string) => {
  return str.replace(/[&<>"'`=\/]/g, '');
};

const noteSchema = yup.object({
  name: yup
    .string()
    .transform((string) => sanitizeString(string))
    .required(),
  category: yup
    .string()
    .transform((string) => sanitizeString(string))
    .required(),
  content: yup
    .string()
    .transform((string) => sanitizeString(string))
    .required(),
});

export const validator = (data: any) => noteSchema.validate(data);
