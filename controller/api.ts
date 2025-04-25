import { Request, Response } from 'express';
import { UserRepository } from '../repository/userCollection';
import { User } from '../entities/user';

interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
}

export const UserController = {
  async updateUserData(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.uid;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const updatedData: Partial<User> = req.body;
      await UserRepository.updateUserData(userId, updatedData);
      res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async fetchUserData(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.user?.uid;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const userData = await UserRepository.fetchUserData(userId);
      if (!userData) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(userData);
    } catch (error) {
      console.error('Fetch error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
