import mongoose from 'mongoose';
import { PetModel } from "./pet";

export interface TutorModel extends mongoose.Document {
  name: string;
  password: string;
  phone: string;
  email: string;
  date_of_birth: string;
  zip_code: string;
  pets: PetModel[];
}
const tutorSchema = new mongoose.Schema<TutorModel>({  
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  zip_code: { type: String, required: true },
  pets: [
    {
      name: { type: String, required: true },
      species: { type: String, required: true },
      carry: { type: String, required: true },
      weight: { type: Number, required: true },
      date_of_birth: { type: String, required: true },
    },
  ],
});

const Tutor = mongoose.model<TutorModel>('Tutor', tutorSchema);

export default Tutor;