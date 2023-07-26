import Pet, { PetModel } from '../models/pet';
import * as tutorService from './tutorService';

async function addPetToTutor(tutorId: string, petData: Partial<PetModel>): Promise<PetModel> {
  const tutor = await tutorService.getTutorById(tutorId);
  if (!tutor) {
    throw new Error('Tutor não encontrado');
  }

  const existingPet = tutor.pets.find((pet: PetModel) => pet.name === petData.name);
  if (existingPet) {
    throw new Error('Já existe um pet com esse nome para o tutor');
  }

  const newPet = new Pet({
    ...petData,
    tutor: tutorId,
  });

  tutor.pets.push(newPet);
  await tutor.save();

  return newPet;
}

async function updatePet(tutorId: string, petId: string, petData: Partial<PetModel>): Promise<PetModel> {
  const tutor = await tutorService.getTutorById(tutorId);
  if (!tutor) {
    throw new Error('Tutor não encontrado');
  }

  const pet = tutor.pets.find((pet: PetModel) => pet._id.toString() === petId);
  if (!pet) {
    throw new Error('Pet não encontrado');
  }

  Object.assign(pet, petData);
  await tutor.save();

  return pet;
}

async function deletePet(tutorId: string, petId: string): Promise<void> {
  const tutor = await tutorService.getTutorById(tutorId);
  if (!tutor) {
    throw new Error('Tutor não encontrado');
  }

  const petIndex = tutor.pets.findIndex((pet: PetModel) => pet._id.toString() === petId);
  if (petIndex === -1) {
    throw new Error('Pet não encontrado');
  }

  tutor.pets.splice(petIndex, 1);
  await tutor.save();
}

async function getPetsByTutor(tutorId: string): Promise<PetModel[]> {
  const tutor = await tutorService.getTutorById(tutorId);
  if (!tutor) {
    throw new Error('Tutor não encontrado');
  }
  return tutor.pets;
}

export { addPetToTutor, updatePet, deletePet, getPetsByTutor };
