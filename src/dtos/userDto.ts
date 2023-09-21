import { IUser } from '../types/baseTypes';

export default class UserDto {
  id;
  email;
  firstName;
  constructor(model: IUser) {
    this.id = model._id;
    this.email = model.email;
    this.firstName = model.firstName;
  }
}
