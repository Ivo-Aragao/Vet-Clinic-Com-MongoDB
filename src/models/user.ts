// models/user.ts
import { Document, Schema, model } from 'mongoose';

export interface UserModel extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<UserModel>('User', userSchema);

export default User;
