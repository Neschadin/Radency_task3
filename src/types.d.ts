import { CATEGORIES } from './constants';

export type TCategory = (typeof CATEGORIES)[number];

export type TNoteData = {
  name: string;
  category: TCategory;
  content: string;
};
