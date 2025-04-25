// config/firebaseConfig.ts
import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hegy-project-default-rtdb.asia-southeast1.firebasedatabase.app"
});

export const db = admin.firestore();
export const auth = admin.auth();
