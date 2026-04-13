import novelsData from '../data/novels.json';
export type Chapter = {
  chapter: number;
  title: string;
  summary: string;
};

export type PastQuestion = {
  id: number;
  question: string;
  options: Record<string, string>;
  answer: string;
  explanation: string;
};

export type Novel = {
  id: string;
  title: string;
  author: string;
  genre: string;
  subject: string;
  exam_focus: string[];
  comprehensive_summary: string;
  chapters: Chapter[];
  past_questions?: {
    exam_type: string;
    total_questions: number;
    questions: PastQuestion[];
  };
};


export type NovelResponse = {
  novels: Novel[];
};
 
/* =========================
   FETCH ALL NOVELS
========================= */

export const fetchNovels = async (): Promise<NovelResponse> => {
  // simulate network delay (optional)
  await new Promise(resolve => setTimeout(resolve, 300));

  return novelsData as NovelResponse;
};

/* =========================
   FETCH SINGLE NOVEL
========================= */

export const fetchNovelById = async (
  id: string
): Promise<Novel | null> => {
  const data = novelsData as NovelResponse;

  const novel = data.novels.find(n => n.id === id);

  return novel ?? null;
};
