const Tutor = require("../models/tutor");
const jwt = require('jsonwebtoken');
const Pet = require("../models/pet");

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

async function addPetToTutor(req, res) {
  try {
    const decoded = verifyToken(req);
    const { tutorId } = req.params;
    const { name, species, carry, weight, date_of_birth } = req.body;

    if (!name || !species || !carry || !weight || !date_of_birth) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
    }

    const tutor = await Tutor.findById(tutorId);

    if (!tutor) {
      return res.status(404).json({ msg: "Tutor não encontrado" });
    }

    const existingPet = tutor.pets.find(pet => pet.name === name);
    if (existingPet) {
      return res.status(400).json({ msg: "Já existe um pet com esse nome para o tutor" });
    }

    const newPet = new Pet({
      name,
      species,
      carry,
      weight,
      date_of_birth
    });

    tutor.pets.push(newPet);

    await tutor.save();

    res.status(201).json({ msg: "Pet adicionado ao tutor com sucesso", pet: newPet });
  } catch (error) {
    console.error('Erro ao adicionar o pet ao tutor:', error);
    res.status(401).json({ msg: 'Não autorizado' });
  }
}

async function updatePet(req, res) {
    try {
      const decoded = verifyToken(req);
      const { tutorId, petId } = req.params;
      const { name, species, carry, weight, date_of_birth } = req.body;
  
      if (!name || !species || !carry || !weight || !date_of_birth) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
      }
  
      const tutor = await Tutor.findById(tutorId);
  
      if (!tutor) {
        return res.status(404).json({ msg: "Tutor não encontrado" });
      }
  
      const pet = tutor.pets.id(petId);
  
      if (!pet) {
        return res.status(404).json({ msg: "Pet não encontrado" });
      }
  
      pet.name = name;
      pet.species = species;
      pet.carry = carry;
      pet.weight = weight;
      pet.date_of_birth = date_of_birth;
  
      await tutor.save();
  
      res.status(200).json({ msg: "Pet atualizado com sucesso", pet });
    } catch (error) {
      console.error('Erro ao atualizar o pet:', error);
      res.status(401).json({ msg: 'Não autorizado' });
    }
  }

  async function deletePet(req, res) {
    try {
      const decoded = verifyToken(req);
      const { tutorId, petId } = req.params;
  
      const tutor = await Tutor.findById(tutorId);
  
      if (!tutor) {
        return res.status(404).json({ msg: "Tutor não encontrado" });
      }
  
      const petIndex = tutor.pets.findIndex(pet => pet._id.toString() === petId);
  
      if (petIndex === -1) {
        return res.status(404).json({ msg: "Pet não encontrado" });
      }
  
      tutor.pets.pull({ _id: petId });
  
      await tutor.save();
  
      res.status(204).end();
    } catch (error) {
      console.error('Erro ao excluir o pet:', error);
      res.status(401).json({ msg: 'Não autorizado' });
    }
  }
module.exports = {
  addPetToTutor,
  updatePet,
  deletePet
};
