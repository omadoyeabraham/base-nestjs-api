import * as Knex from 'knex';

import { UserModel } from '../models/user.model';
import { UserModelFactory } from '../factories/users.factory';

export async function seed(knex: Knex): Promise<any> {
  const users = UserModelFactory.make(3);
  await UserModel.query(knex).insert(users);
}
