const Pet = require('../models/pet');
/
async function getPetById(id) {
  return await Pet.findById(id);
}

async function createPet(petData) {
  const pet = new Pet(petData);
  return await pet.save();
}

async function updatePet(id, petData) {
  return await Pet.findByIdAndUpdate(id, petData, { new: true });
}

async function deletePet(id) {
  return await Pet.findByIdAndDelete(id);
}

module.exports = {
  getPetById,
  createPet,
  updatePet,
  deletePet
};
