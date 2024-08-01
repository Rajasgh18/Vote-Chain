import { Router } from 'express';
import { sendOTP, verifyOTP } from '@/controllers/login';

const router = Router();

router
    .get('/send-otp/:id', sendOTP)
    .post('/verify-otp', verifyOTP);

export default router;