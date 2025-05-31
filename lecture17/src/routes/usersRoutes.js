import express from 'express';
import { getUsers,createUser, updateUser, deleteUser } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/createUser', createUser);
router.get('/updateUser/:id', updateUser);
router.get('/deleteUser/:id', deleteUser);

export default router;