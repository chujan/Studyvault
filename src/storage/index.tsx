// src/storage/cache.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

type CachePayload<T> = {
  data: T;
  timestamp: number;
};

export async function getCache<T>(
  key: string
): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;

    const parsed: CachePayload<T> = JSON.parse(value);

    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      await AsyncStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

export async function setCache<T>(
  key: string,
  data: T
): Promise<void> {
  try {
    const payload: CachePayload<T> = {
      data,
      timestamp: Date.now(),
    };

    await AsyncStorage.setItem(key, JSON.stringify(payload));
  } catch (error) {
    console.error('Cache write error:', error);
  }
}
