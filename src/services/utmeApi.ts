// src/services/utmeApi.ts
import { Question } from '../services/Question';
import { UtmeSection } from '../services/types';
import uniportData from '../data/uniport_2005_2006.json';

const flattenQuestions = (
  qs: any[],
  inheritedInstruction?: string | null,
  inheritedPassage?: string | null
): Question[] => {
  return qs.flatMap((q): Question[] => {
    // If this is a group, recurse with updated instruction
    if (Array.isArray(q.questions)) {
      return flattenQuestions(
        q.questions,
        q.instruction ?? inheritedInstruction,
        inheritedPassage
      );
    }

    if (!q.question || !q.options) return [];

    const options = Object.entries(q.options)
      .filter(([_, text]) => typeof text === 'string')
      .map(([key, text]) => ({
        key,
        text: text as string,
      }));

    return [
      {
        id: q.number ?? undefined,
        text: q.question as string,
        answer: q.answer ?? '',
        options,
        rawOption: q.options ?? undefined,
        instruction: q.instruction ?? inheritedInstruction ?? null,
        passage: inheritedPassage ?? null,
      },
    ];
  });
};

export const fetchUtmeSection = async (
  subject: string
): Promise<UtmeSection> => {
  const section = uniportData.sections.find(
    s => s.name.toLowerCase() === subject.toLowerCase()
  );

  if (!section) {
    return { questions: [] };
  }

  return {
    instruction: section.instruction ?? undefined,
    passage: section.passage ?? undefined,
    questions: flattenQuestions(
      section.questions,
      section.instruction ?? null,
      section.passage ?? null
    ),
  };
};
