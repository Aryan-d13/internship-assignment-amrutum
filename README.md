# Routine App

A powerful routine management app that allows users to create, view, and track routines with detailed steps and milestones. This app leverages Firebase Firestore for backend data storage and React Native for the frontend.

---

## Features

- **Admin Features:**
  - Create and edit routines with milestones and steps.
  - Update existing routines.

- **User Features:**
  - Browse available routines.
  - View routine details and milestones.
  - Track progress with weekly updates.

- **Backend:** Firebase Firestore for data storage.

---

## Screenshots

![WhatsApp Image 2024-12-25 at 12 34 40_3db0e6f7](https://github.com/user-attachments/assets/a2fc132c-a0c9-40c5-b29f-dc5e997ac845)
![WhatsApp Image 2024-12-25 at 12 34 41_101eb38c](https://github.com/user-attachments/assets/e6a84011-5e28-420c-9be3-04c6f399b0be)
![WhatsApp Image 2024-12-25 at 12 34 41_3a62f16d](https://github.com/user-attachments/assets/46e244f1-d7e3-44e3-bc8e-c753cc6ceb02)
![WhatsApp Image 2024-12-25 at 12 34 41_44951cd5](https://github.com/user-attachments/assets/e8587f48-f3fc-41c9-8dfb-74246b555dd2)



---

## Installation and Setup

### Prerequisites

1. **Node.js and npm**: Ensure Node.js and npm are installed on your system. Download it from [Node.js](https://nodejs.org/).
2. **Expo CLI**: Install Expo CLI globally by running:
   ```bash
   npm install -g expo-cli
   ```
3. **Firebase Project**: Create a Firebase project and enable Firestore. Add your Firebase configuration in `firebaseConfig.js`.

---

## Running the Application

### 1. Clone the Repository

Clone the repository to your local system:
```bash
git clone <repository-url>
cd routine-app
```

### 2. Install Dependencies

Run the following command to install all required dependencies:
```bash
npm install
```

### 3. Configure Firebase

Ensure your Firebase configuration is correctly set up in `src/services/firebaseConfig.js`:
```javascript
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
```

### 4. Start the Application

#### For Web:
Run the following command:
```bash
npm start
```
Open the application in a browser by selecting `w` when prompted.

#### For Android:
1. Install the Expo Go app from the Google Play Store.
2. Run:
   ```bash
   npm start
   ```
3. Scan the QR code displayed in the terminal or Expo web interface using the Expo Go app.

#### For iOS:
1. Install the Expo Go app from the App Store.
2. Run:
   ```bash
   npm start
   ```
3. Scan the QR code displayed in the terminal or Expo web interface using the Expo Go app.

---

## Additional Notes

- Ensure your Firebase Firestore rules are set to allow read and write operations for testing:
  ```json
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if true;
      }
    }
  }
  ```

- Use proper authentication and validation rules for production.

---

## Troubleshooting

### Common Issues:

1. **Firebase Not Configured**:
   Ensure you have correctly added your Firebase configuration in `firebaseConfig.js`.

2. **Expo Not Installed**:
   Install Expo CLI globally using:
   ```bash
   npm install -g expo-cli
   ```

3. **Duplicate Routines in the List**:
   Ensure the `id` used in the `FlatList` key extractor is unique and matches the Firestore document ID.

---

## License

This project is licensed under the MIT License.

