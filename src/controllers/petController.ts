import { Request, Response } from 'express';
import * as petService from '../services/petService';
import verifyToken from '../middlewares/verifyToken'; // Importe a função verifyToken

async function addPetToTutor(req: Request, res: Response): Promise<void> {
  try {
    // Use a função verifyToken para validar o token antes de prosseguir
    const decodedToken = verifyToken(req);
    // Se chegou aqui, o token é válido e pode continuar com a lógica do endpoint

    const { tutorId } = req.params;
    const { name, species, carry, weight, date_of_birth } = req.body;

    if (!name || !species || !carry || !weight || !date_of_birth) {
      res.status(400).json({ msg: "Todos os campos são obrigatórios" });
      return;
    }

    const newPet = await petService.addPetToTutor(tutorId, {
      name,
      species,
      carry,
      weight,
      date_of_birth,
    });

    res.status(201).json({ msg: "Pet adicionado ao tutor com sucesso", pet: newPet });
  } catch (error) {
    console.error('Erro ao adicionar o pet ao tutor:', error);
    res.status(401).json({ msg: 'Não autorizado' });
  }
}

async function updatePet(req: Request, res: Response): Promise<void> {
  try {
    // Use a função verifyToken para validar o token antes de prosseguir
    const decodedToken = verifyToken(req);
    // Se chegou aqui, o token é válido e pode continuar com a lógica do endpoint

    const { tutorId, petId } = req.params;
    const { name, species, carry, weight, date_of_birth } = req.body;

    if (!name || !species || !carry || !weight || !date_of_birth) {
      res.status(400).json({ msg: "Todos os campos são obrigatórios" });
      return;
    }

    const updatedPet = await petService.updatePet(tutorId, petId, {
      name,
      species,
      carry,
      weight,
      date_of_birth,
    });

    res.status(200).json({ msg: "Pet atualizado com sucesso", pet: updatedPet });
  } catch (error) {
    console.error('Erro ao atualizar o pet:', error);
    res.status(401).json({ msg: 'Não autorizado' });
  }
}

async function deletePet(req: Request, res: Response): Promise<void> {
  try {
    // Use a função verifyToken para validar o token antes de prosseguir
    const decodedToken = verifyToken(req);
    // Se chegou aqui, o token é válido e pode continuar com a lógica do endpoint

    const { tutorId, petId } = req.params;

    await petService.deletePet(tutorId, petId);

    res.status(204).end();
  } catch (error) {
    console.error('Erro ao excluir o pet:', error);
    res.status(401).json({ msg: 'Não autorizado' });
  }
}

export {
  addPetToTutor,
  updatePet,
  deletePet,
};

