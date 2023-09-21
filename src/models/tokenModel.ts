import { Schema, model } from 'mongoose';
import { IToken } from './../types/baseTypes';

const tokenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  refreshToken: { type: String, required: true },
});

const Token = model('Token', tokenSchema);

export default Token;
