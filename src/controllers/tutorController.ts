import { Request, Response } from 'express';
import * as tutorService from '../services/tutorService';
import * as petService from '../services/petService';
import verifyToken from '../middlewares/verifyToken'; // Importe a função verifyToken

// Resto do código do tutorController.ts, usando a função verifyToken nos endpoints que precisarem
// Exemplo de uso: router.get('/rota', verifyToken, nomeDoController)

async function createTutor(req: Request, res: Response): Promise<void> {
  try {
    const { name, password, phone, email, date_of_birth, zip_code } = req.body;

    if (!name || !password || !phone || !email || !date_of_birth || !zip_code) {
      res.status(400).json({ msg: "Todos os campos são obrigatórios" });
      return;
    }

    // Crie o tutor e obtenha o token junto com o tutor criado
    const { tutor, token } = await tutorService.createTutor(req.body);

    res.status(201).json({ msg: "Tutor criado com sucesso", tutor, token });
  } catch (error) {
    console.error('Erro ao criar o tutor:', error);
    res.status(401).json({ msg: 'Não autorizado' });
  }
}

async function getAllTutors(req: Request, res: Response): Promise<void> {
  try {
    // Use a função verifyToken para validar o token antes de prosseguir
    const decodedToken = verifyToken(req);
    // Se chegou aqui, o token é válido e pode continuar com a lógica do endpoint

    const tutors = await tutorService.getAllTutors();
    res.json(tutors);
  } catch (error) {
    console.error('Erro ao obter os tutores:', error);
    res.status(401).json({ msg: 'Não autorizado' });
  }
}

async function updateTutor(req: Request, res: Response): Promise<void> {
  try {
    // Use a função verifyToken para validar o token antes de prosseguir
    const decodedToken = verifyToken(req);
    // Se chegou aqui, o token é válido e pode continuar com a lógica do endpoint

    const { tutorId } = req.params;
    const { name, phone, email, date_of_birth, zip_code } = req.body;

    if (!name || !phone || !email || !date_of_birth || !zip_code) {
      res.status(400).json({ msg: "Todos os campos são obrigatórios" });
      return;
    }

    const tutorData = {
      name,
      phone,
      email,
      date_of_birth,
      zip_code
    };

    const tutor = await tutorService.updateTutor(tutorId, tutorData);
    if (!tutor) {
      res.status(404).json({ msg: 'Tutor não encontrado' });
      return;
    }

    res.json({ msg: 'Tutor atualizado com sucesso', tutor });
  } catch (error) {
    console.error('Erro ao atualizar o tutor:', error);
    res.status(401).json({ msg: 'Não autorizado' });
  }
}

async function deleteTutor(req: Request, res: Response): Promise<void> {
  try {
    // Use a função verifyToken para validar o token antes de prosseguir
    const decodedToken = verifyToken(req);
    // Se chegou aqui, o token é válido e pode continuar com a lógica do endpoint

    const { tutorId } = req.params;

    const tutorPets = await petService.getPetsByTutor(tutorId);
    if (tutorPets.length > 0) {
      res.status(400).json({ msg: "Não é possível excluir o tutor. Há pets associados a ele." });
      return;
    }

    const tutor = await tutorService.getTutorById(tutorId);
    if (!tutor) {
      res.status(404).json({ msg: "Tutor não encontrado" });
      return;
    }

    await tutorService.deleteTutor(tutorId);

    res.status(204).end();
  } catch (error) {
    console.error('Erro ao excluir o tutor:', error);
    res.status(401).json({ msg: 'Não autorizado' });
  }
}

export {
  createTutor,
  getAllTutors,
  updateTutor,
  deleteTutor,
};
