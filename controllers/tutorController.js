const Tutor = require("../models/tutor");
const Pet = require("../models/pet");
const jwt = require('jsonwebtoken');


function verifyToken(req) {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]; 
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Token inválido');
    }
  } else {
    throw new Error('Token não fornecido');
  }
}

async function getAllTutors(req, res) {
  try {
    const decoded = verifyToken(req);
    const tutors = await Tutor.find().populate("pets");
    res.json(tutors);
  } catch (error) {
    console.error('Erro ao obter os tutores:', error);
    res.status(401).json({ msg: 'Não autorizado' });
  }
}

async function createTutor(req, res) {
  try {
    const decoded = verifyToken(req);
    const { name, password, phone, email, date_of_birth, zip_code } = req.body;

    if (!name || !password || !phone || !email || !date_of_birth || !zip_code) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
    }

    const existingTutor = await Tutor.findOne({ email });
    if (existingTutor) {
      return res.status(400).json({ msg: "Já existe um tutor com esse email" });
    }

    const tutorData = {
      name,
      password,
      phone,
      email,
      date_of_birth,
      zip_code
    };

    const tutor = new Tutor(tutorData);
    await tutor.save();
    res.status(201).json({ msg: "Tutor criado com sucesso", tutor });
  } catch (error) {
    console.error('Erro ao criar o tutor:', error);
    res.status(401).json({ msg: 'Não autorizado' });
  }
}

async function updateTutor(req, res) {
  try {
    const decoded = verifyToken(req);
    const { id } = req.params;
    const { name, phone, email, date_of_birth, zip_code } = req.body;

    if (!name || !phone || !email || !date_of_birth || !zip_code) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
    }

    const tutorData = {
      name,
      phone,
      email,
      date_of_birth,
      zip_code
    };

    const tutor = await Tutor.findByIdAndUpdate(id, tutorData, { new: true });
    if (!tutor) {
      return res.status(404).json({ msg: "Tutor não encontrado" });
    }
    res.json({ msg: "Tutor atualizado com sucesso", tutor });
  } catch (error) {
    console.error('Erro ao atualizar o tutor:', error);
    res.status(401).json({ msg: 'Não autorizado' });
  }
}

async function deleteTutor(req, res) {
    try {
      const decoded = verifyToken(req);
      const { id } = req.params;
  
      const tutor = await Tutor.findById(id).populate("pets");
      if (!tutor) {
        return res.status(404).json({ msg: "Tutor não encontrado" });
      }
  
      if (tutor.pets.length > 0) {
        return res.status(400).json({ msg: "Não é possível excluir o tutor. Há pets associados a ele." });
      }
  
      await Tutor.findByIdAndDelete(id);
      
      res.status(204).end();
    
    } catch (error) {
      console.error('Erro ao excluir o tutor:', error);
      res.status(401).json({ msg: 'Não autorizado' });
    }
  }
  
module.exports = {
  getAllTutors,
  createTutor,
  updateTutor,
  deleteTutor
};
