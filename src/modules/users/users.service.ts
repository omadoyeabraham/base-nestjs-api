import { Injectable } from '@nestjs/common';

import { UserModel } from '../database/models/user.model';
import { CreateUserDTO } from './DTOs/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  /**
   * Find a user by their username.
   *
   * @param username
   */
  async findByUsername(username: string): Promise<UserModel | undefined> {
    return await this.usersRepository.findByUsername(username);
  }

  /**
   * Create a new user.
   *
   * @param dto
   */
  async create(createUserDto: CreateUserDTO): Promise<UserModel> {
    return await this.usersRepository.create(createUserDto);
  }
}
