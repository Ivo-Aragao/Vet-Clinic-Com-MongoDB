const Tutor = require("../repositories/tutorRepository");
/
async function addPetToTutor(tutorId, data) {
  const tutor = await Tutor.findById(tutorId);

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  tutor.pets.push(data);
  return tutor.save();
}

async function updatePet(tutorId, petId, data) {
  const tutor = await Tutor.findById(tutorId);

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  const pet = tutor.pets.id(petId);

  if (!pet) {
    throw new Error("Pet not found");
  }

  Object.assign(pet, data);
  return tutor.save();
}

async function deletePet(tutorId, petId) {
  const tutor = await Tutor.findById(tutorId);

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  const pet = tutor.pets.id(petId);

  if (!pet) {
    throw new Error("Pet not found");
  }

  pet.remove();
  return tutor.save();
}

module.exports = {
  addPetToTutor,
  updatePet,
  deletePet
};
