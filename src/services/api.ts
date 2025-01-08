// Updated api.ts to ensure no duplication and proper ID usage
import { db } from './firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';

// Collection references
const routinesCollection = collection(db, 'routines');

// Fetch all routines
export const fetchAllRoutines = async () => {
  const snapshot = await getDocs(routinesCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id, // Use Firestore document ID
    ...doc.data(),
  }));
};

// Create a new routine
export const createRoutine = async (routine) => {
  const docRef = await addDoc(routinesCollection, routine);
  return { id: docRef.id, ...routine }; // Ensure ID is consistent
};

// Update an existing routine
export const updateRoutine = async (id, updates) => {
  const routineDoc = doc(db, 'routines', id);
  await updateDoc(routineDoc, updates);
  return { id, ...updates }; 
};
