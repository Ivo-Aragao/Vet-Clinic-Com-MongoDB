import express from 'express';
const router = express.Router();
import * as loginController from '../controllers/loginController';

router.post("/auth", loginController.loginAuth);

export default router;
