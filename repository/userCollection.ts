import { db } from '../config/firebaseConfig';
import { User } from '../entities/user';

const usersCollection = db.collection('USERS');

export const UserRepository = {
  async updateUserData(userId: string, userData: Partial<User>): Promise<void> {
    await usersCollection.doc(userId).set({
      ...userData,
      lastUpdated: new Date()
    }, { merge: true });
  },

  async fetchUserData(userId: string): Promise<User | null> {
    console.log(`📥 Fetching user data for ID: ${userId}`);
    
    const userDoc = await usersCollection.doc(userId).get();

    if (!userDoc.exists) {
      console.log(`❌ User [${userId}] not found.`);
      return null;
    }

    const data = userDoc.data() as User;
    console.log(`📦 Data fetched for user [${userId}]:`, data);
    return data;
  }

};
