import { UserModel } from '../models/user.model';
import faker from 'faker';
import { BaseModelFactory } from './base.factory';

export class UserModelFactory extends BaseModelFactory {
  static ModelClass = UserModel;

  static modelFields() {
    return {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: 'password',
    };
  }

  static make(numberOfRecords = 1, overideFields = {}): Partial<UserModel> {
    return super.make(numberOfRecords, overideFields);
  }
}
