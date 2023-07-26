import express from 'express';
const router = express.Router();
import * as petController from '../controllers/petController';

// Rota para adicionar pet ao tutor (exige token de validação)
router.post('/pet/:tutorId', petController.addPetToTutor);

// Rota para atualizar pet do tutor (exige token de validação)
router.put('/pet/:petId/tutor/:tutorId',  petController.updatePet);

// Rota para excluir pet do tutor (exige token de validação)
router.delete('/pet/:petId/tutor/:tutorId', petController.deletePet);

export default router;