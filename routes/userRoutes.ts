import express from 'express';
import axios from 'axios';
import { UserController } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();


const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY ;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const { idToken, refreshToken, expiresIn, localId } = response.data;

    res.json({
      success: true,
      idToken,
      refreshToken,
      expiresIn,
      uid: localId,
    });
  } catch (error: any) {
    console.error('Login error:', error?.response?.data || error.message);
    res.status(401).json({
      error: 'Invalid credentials',
      detail: error?.response?.data?.error?.message || 'Unknown error',
    });
  }
});

router.put('/update-user-data', authMiddleware, UserController.updateUserData);
router.get('/fetch-user-data', authMiddleware, UserController.fetchUserData);

export default router;
