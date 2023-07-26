import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Tutor, { TutorModel } from "../models/tutor";
import User from "../models/user";

async function createTutor(reqData: Partial<TutorModel>): Promise<{ tutor: TutorModel; token: string }> {
  const { name, password, phone, email, date_of_birth, zip_code } = reqData;

  if (!name || !password || !phone || !email || !date_of_birth || !zip_code) {
    throw new Error("Todos os campos são obrigatórios");
  }

  const existingTutor = await Tutor.findOne({ email });
  if (existingTutor) {
    throw new Error("Já existe um tutor com esse email");
  }

  // Crie o usuário (User) usando o mesmo email e senha fornecidos para o tutor
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  // Crie o tutor com o email e senha fornecidos e o usuário (User) associado
  const tutorData = {
    name,
    password, // Você pode optar por armazenar a senha do tutor separadamente do usuário (User)
    phone,
    email,
    date_of_birth,
    zip_code,
  };
  const tutor = new Tutor(tutorData);
  await tutor.save();

  const token = jwt.sign({ tutorId: tutor._id }, process.env.JWT_SECRET || 'secretkey');

  return { tutor, token };
}

async function getAllTutors(): Promise<TutorModel[]> {
  return await Tutor.find().populate('pets').exec();
}

async function updateTutor(tutorId: string, tutorData: Partial<TutorModel>): Promise<TutorModel | null> {
  const tutor = await Tutor.findByIdAndUpdate(tutorId, tutorData, { new: true });
  return tutor;
}

async function deleteTutor(tutorId: string): Promise<void> {
  await Tutor.findByIdAndDelete(tutorId);
}

async function getTutorByEmail(email: string): Promise<TutorModel | null> {
  return await Tutor.findOne({ email });
}

async function getTutorById(tutorId: string): Promise<TutorModel | null> {
  return await Tutor.findById(tutorId);
}

export {
  createTutor,
  getAllTutors,
  updateTutor,
  deleteTutor,
  getTutorByEmail,
  getTutorById,
};
