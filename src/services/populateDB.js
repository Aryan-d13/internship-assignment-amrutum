const { db } = require('./firebaseConfig');
const { collection, addDoc } = require('firebase/firestore');

async function populateFirestore() {
  try {
    const routinesCollection = collection(db, 'routines');
    await addDoc(routinesCollection, {
      title: '8-Week Hair Care Routine',
      duration: 8,
      milestones: [
        'Week 1: Improved scalp health',
        'Week 2: Increased hydration',
        'Week 3: Reduced hair breakage',
      ],
      steps: [
        { stepNumber: 1, description: 'Wash hair with almond oil shampoo' },
        { stepNumber: 2, description: 'Apply scalp serum' },
        { stepNumber: 3, description: 'Play calming music for relaxation' },
      ],
      brandId: 'brand123',
    });

    console.log('Firestore populated successfully!');
  } catch (error) {
    console.error('Error populating Firestore:', error);
  }
}

populateFirestore();
