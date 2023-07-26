import mongoose, { Document } from 'mongoose';

export interface PetModel extends Document {
  _id: mongoose.Types.ObjectId; // Adicionamos a propriedade _id
  name: string;
  species: string;
  carry: string;
  weight: number;
  date_of_birth: Date;
  tutor: mongoose.Types.ObjectId;
}

const petSchema = new mongoose.Schema<PetModel>({
  name: { type: String, required: true },
  species: { type: String, required: true },
  carry: { type: String, required: true },
  weight: { type: Number, required: true },
  date_of_birth: { type: Date, required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
});

const Pet = mongoose.model<PetModel>('Pet', petSchema);

export default Pet;
