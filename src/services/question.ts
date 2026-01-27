// src/types/Question.ts
export type Question = {
  id?: number; // optional in case some endpoints don’t provide it
  text: string;
  options: { key: string; text: string }[];
  answer: string;
  rawOption?: Record<string, string | null>; 
   instructionIndex?: number;
};

