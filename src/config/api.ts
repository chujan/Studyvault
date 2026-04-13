/* eslint-disable react-native/no-inline-styles */

export const NEWS_API_KEY = '14d7faa62abb49ceaf7f085fb25cdf5f';
export const NEWS_BASE_URL = 'https://newsapi.org/v2';

export const NEWS_ENDPOINTS = {
  GET_NEWS: `${NEWS_BASE_URL}/everything`,
};

export const fetchEducationNews = async () => {
  try {
    // ✅ Last 30 days
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);

    // ✅ Flexible query
    const query = encodeURIComponent(
      '(JAMB OR WAEC OR NECO OR UTME OR "post utme" OR exam OR education Nigeria)'
    );

    const response = await fetch(
      `${NEWS_ENDPOINTS.GET_NEWS}?q=${query}&from=${fromDate.toISOString()}&sortBy=publishedAt&language=en&pageSize=20&apiKey=${NEWS_API_KEY}&_=${Date.now()}`
    );

    const data = await response.json();

    console.log('NEWS RESPONSE:', data); // ✅ Debug

    return data.articles || [];
  } catch (error) {
    console.log('News Fetch Error:', error);
    return [];
  }
};