

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Firebase automatically initializes from native config
export const firebaseAuth = auth();
export const db = firestore();
export const { FieldValue } = firestore;
export {};