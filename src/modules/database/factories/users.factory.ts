import faker from 'faker';

import { BaseModelFactory } from './base.factory';
import { UserModel } from '../models/user.model';

export class UserModelFactory extends BaseModelFactory {
  ModelClass = UserModel;

  static modelClass() {
    return UserModel;
  }

  /**
   * The data fields for this model
   */
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
