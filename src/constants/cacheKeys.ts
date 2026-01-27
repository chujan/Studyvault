export const CACHE_KEYS = {
  jambQuestions: (subject: string, year: number) =>
    `jamb_questions_${subject}_${year}`,
};