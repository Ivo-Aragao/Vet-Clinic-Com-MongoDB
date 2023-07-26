import express from 'express';
const router = express.Router();
import * as tutorController from '../controllers/tutorController';

router.get('/tutors',  tutorController.getAllTutors);
router.post('/tutor', tutorController.createTutor);
router.put('/tutor/:tutorId',   tutorController.updateTutor); 
router.delete('/tutor/:tutorId',   tutorController.deleteTutor); 

export default router;
