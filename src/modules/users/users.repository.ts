import { Injectable, Inject } from '@nestjs/common';
import { ModelClass } from 'objection';

import { UserModel } from '@modules/database';
import { CreateUserDTO } from '@modules/users';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('UserModel') private userModelClass: ModelClass<UserModel>,
  ) {}

  /**
   * Get all users
   */
  async findAll(): Promise<UserModel[]> {
    return this.userModelClass.query();
  }

  /**
   * Find a user by their username
   * @param username
   */
  async findByUsername(username: string): Promise<UserModel | undefined> {
    return await this.userModelClass.query().findOne({ username });
  }

  /**
   * Create a new user.
   *
   * @param dto
   */
  async create(dto: CreateUserDTO): Promise<UserModel> {
    delete dto.confirm_password;

    return this.userModelClass
      .query()
      .insert(dto)
      .returning('*');
  }
}
