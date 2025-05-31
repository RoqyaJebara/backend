import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/register', AuthController.register);
//name email password
//post
router.post('/login', AuthController.login);
//Qw1&Qw1&
//name1@gmail.com
//post
//http://localhost:5000/api/auth/login
router.get('/me', authenticate, AuthController.getMe);
//get 
//Authorization
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4MjU5OTExLCJleHAiOjE3NDgzNDYzMTF9.im0P7ZCeWEIxBpewSpGKdWt4r4FmR5quPQ5vnL7NpRc

router.put('/change-password', authenticate, AuthController.changePassword);
// http://localhost:5000/api/auth/change-password
//Authorization in header
//currentPassword in body
//newPassword in body
//put
export default router;
//Qw1&Qw123 name2
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ4MjgyNzU3LCJleHAiOjE3NDgzNjkxNTd9.r9IBj3TSTeQKfMVfs9rHkIyK0eg41UK8IXDELBPhezI