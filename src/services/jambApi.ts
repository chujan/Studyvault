const BASE_URL = 'https://questions.aloc.com.ng/api/v2';
const ALOC_TOKEN = 'QB-dc98cb4982f83a278637';

const normalizeSubject = (subject: string) => {
  const map: Record<string, string> = {
    'english language': 'english',
  };
  return map[subject.toLowerCase()] ?? subject.toLowerCase();
};

import { Question } from './question';

export const fetchJambQuestions = async (subject: string): Promise<Question[]> => {
  const cleanSubject = normalizeSubject(subject);
  
  // Explicitly fetch UTME questions only
  const url = `${BASE_URL}/m?subject=${encodeURIComponent(cleanSubject)}&type=utme`;
  console.log('FETCHING:', url);

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      AccessToken: ALOC_TOKEN,
    },
  });

  const json = await response.json();
  console.log('API RESPONSE:', json);

  if (json.status !== 200 || !Array.isArray(json.data)) return [];

  return json.data.map((q: any) => ({
    id: q.id,
    text: q.question,
    options: Object.entries(q.option || {})
      .filter(([_, v]) => v !== null)
      .map(([k, v]) => ({
        key: k.toLowerCase(),
        text: v as string,
      })),
    answer: q.answer || '',
    rawOption: q.option,
  }));

  
};


// Fetch WAEC questions
export const fetchNecoQuestions = async (subject: string): Promise<Question[]> => {
  const cleanSubject = normalizeSubject(subject);
  const url = `${BASE_URL}/m?subject=${encodeURIComponent(cleanSubject)}&type=neco`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      AccessToken: ALOC_TOKEN,
    },
  });

  const json = await response.json();
  if (json.status !== 200 || !Array.isArray(json.data)) return [];

  return json.data.map((q: any) => ({
    id: q.id,
    text: q.question,
    options: Object.entries(q.option || {})
      .filter(([_, v]) => v !== null)
      .map(([k, v]) => ({ key: k.toLowerCase(), text: v as string })),
    answer: q.answer || '',
    rawOption: q.option,
  }));
};


export const fetchWaecQuestions = async (subject: string): Promise<Question[]> => {
  const cleanSubject = normalizeSubject(subject);
  const url = `${BASE_URL}/m?subject=${encodeURIComponent(cleanSubject)}&type=waec`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      AccessToken: ALOC_TOKEN,
    },
  });

  const json = await response.json();
  if (json.status !== 200 || !Array.isArray(json.data)) return [];

  return json.data.map((q: any) => ({
    id: q.id,
    text: q.question,
    options: Object.entries(q.option || {})
      .filter(([_, v]) => v !== null)
      .map(([k, v]) => ({ key: k.toLowerCase(), text: v as string })),
    answer: q.answer || '',
    rawOption: q.option,
  }));
};


// services/jambApi.ts



