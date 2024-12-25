Routine App

A powerful routine management app that allows users to create, view, and track routines with detailed steps and milestones. This app leverages Firebase Firestore for backend data storage and React Native for the frontend.

Features

Admin Features:

Create and edit routines with milestones and steps.

Update existing routines.

User Features:

Browse available routines.

View routine details and milestones.

Track progress with weekly updates.

Backend: Firebase Firestore for data storage.

Screenshots

Upload screenshots here to showcase the app's UI.

Installation and Setup

Prerequisites

Node.js and npm: Ensure Node.js and npm are installed on your system. Download it from Node.js.

Expo CLI: Install Expo CLI globally by running:

npm install -g expo-cli

Firebase Project: Create a Firebase project and enable Firestore. Add your Firebase configuration in firebaseConfig.js.

Running the Application

1. Clone the Repository

Clone the repository to your local system:

git clone <repository-url>
cd routine-app

2. Install Dependencies

Run the following command to install all required dependencies:

npm install

3. Configure Firebase

Ensure your Firebase configuration is correctly set up in src/services/firebaseConfig.js:

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: '<YOUR_API_KEY>',
  authDomain: '<YOUR_AUTH_DOMAIN>',
  projectId: '<YOUR_PROJECT_ID>',
  storageBucket: '<YOUR_STORAGE_BUCKET>',
  messagingSenderId: '<YOUR_MESSAGING_SENDER_ID>',
  appId: '<YOUR_APP_ID>',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

4. Start the Application

For Web:

Run the following command:

npm start

Open the application in a browser by selecting w when prompted.

For Android:

Install the Expo Go app from the Google Play Store.

Run:

npm start

Scan the QR code displayed in the terminal or Expo web interface using the Expo Go app.

For iOS:

Install the Expo Go app from the App Store.

Run:

npm start

Scan the QR code displayed in the terminal or Expo web interface using the Expo Go app.

Additional Notes

Ensure your Firebase Firestore rules are set to allow read and write operations for testing:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

Use proper authentication and validation rules for production.

Troubleshooting

Common Issues:

Firebase Not Configured:
Ensure you have correctly added your Firebase configuration in firebaseConfig.js.

Expo Not Installed:
Install Expo CLI globally using:

npm install -g expo-cli

Duplicate Routines in the List:
Ensure the id used in the FlatList key extractor is unique and matches the Firestore document ID.

License

This project is licensed under the MIT License.