


import uniportData from '../data/uniport.json';
import unizikData from '../data/unizik.json';

/* =======================
   TYPES
======================= */

export type Option = {
  key: string;
  text: string;
};

export type Question = {
  id: string; // 👈 ALWAYS EXISTS
  text: string;
  answer: string;
  options: Option[];
  rawOption: Record<string, string>;
  instruction: string | null;
  passage: string | null;
  explanation?: string | null;
};

export type UtmeSection = {
  instruction?: string;
  passage?: string;
  questions: Question[];
};

/* =======================
   DATA SOURCE
======================= */

const DATA_BY_INSTITUTION: Record<string, any[]> = {
  UNIPORT: uniportData,
  UNIZIK: unizikData,
};

/* =======================
   HELPERS
======================= */

// ✅ Stable ID generator for LOCAL JSON
const generateLocalId = (
  subject: string,
  year: string,
  index: number
) => `${subject}-${year}-${index}`;

/* =======================
   FLATTEN QUESTIONS
======================= */

const flattenQuestions = (
  qs: any[],
  inheritedInstruction: string | null,
  inheritedPassage: string | null,
  meta: {
    subject: string;
    year: string;
  },
  indexRef: { value: number }
): Question[] => {
  return qs.flatMap((q): Question[] => {

    /* =======================
       GROUP NODE
    ======================= */
    if (Array.isArray(q.questions)) {
  const nextInstruction = q.instruction ?? inheritedInstruction;

  const nextPassage =
    'passage' in q
      ? q.passage ?? null
      : null; // 👈 IMPORTANT RESET

  return flattenQuestions(
    q.questions,
    nextInstruction,
    nextPassage,
    meta,
    indexRef
  );
}


    /* =======================
       INVALID NODE
    ======================= */
    if (!q.question || !q.options) return [];

    /* =======================
       OPTIONS NORMALIZATION
    ======================= */
    const options: Option[] = Object.entries(q.options)
      .filter(([_, text]) => typeof text === 'string')
      .map(([key, text]) => ({
        key,
        text: text as string,
      }));

    /* =======================
       ID NORMALIZATION
    ======================= */
    const id =
      q.id != null
        ? String(q.id) // ALOC API
        : q.number != null
        ? String(q.number) // Local JSON
        : generateLocalId(
            meta.subject,
            meta.year,
            indexRef.value
          ); // Guaranteed fallback

    indexRef.value += 1;

    /* =======================
       FINAL QUESTION
    ======================= */
    return [
      {
        id,
        text: q.question,
        answer: q.answer ?? '',
        explanation: q.explanation ?? null,
        options,
        rawOption: q.options,
        instruction: q.instruction ?? inheritedInstruction,
        passage: q.passage ?? inheritedPassage,
      },
    ];
  });
};

/* =======================
   MAIN FETCH FUNCTION
======================= */

export const fetchUtmeSection = async (
  institution: string,
  subject: string,
  year: string
): Promise<UtmeSection> => {

  const data = DATA_BY_INSTITUTION[institution];

  if (!data) {
    console.warn('No data for institution:', institution);
    return { questions: [] };
  }

  const yearData = data.find(
    y => y.year === year
  );

  if (!yearData) {
    console.warn('No data for year:', year);
    return { questions: [] };
  }

  const section = yearData.sections.find(
    (s: any) =>
      s.name?.toLowerCase().trim() ===
      subject.toLowerCase().trim()
  );

  if (!section) {
    console.warn('No section for subject:', subject);
    return { questions: [] };
  }

  const indexRef = { value: 1 };

  return {
    instruction: section.instruction ?? undefined,
    passage: section.passage ?? undefined,
    questions: flattenQuestions(
      section.questions,
      section.instruction ?? null,
      section.passage ?? null,
      { subject, year },
      indexRef
    ),
  };
};

