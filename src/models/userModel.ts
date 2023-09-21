import { Schema, model } from 'mongoose';
import { IUser } from 'src/types/baseTypes';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  birthDate: { type: Date },
  avatar: { type: String },
});

const User = model('User', userSchema);

export default User;
