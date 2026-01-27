// src/services/types.ts
import { Question } from './Question';

export type UtmeSection = {
  instruction?: string;
  passage?: string;
  questions: Question[];
};
