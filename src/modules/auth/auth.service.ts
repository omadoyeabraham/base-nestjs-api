import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService, CreateUserDTO } from '@modules/users';
import { UserModel } from '@modules/database';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate a user by their credentials
   *
   * @param username
   * @param password
   */
  async validateUser(username: string, password: string): Promise<any> {
    const userPassword = password;
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return null;
    }

    // Check if provided password matches the user's password
    if (await bcrypt.compare(userPassword, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  /**
   * Login a user i.e create a Jwt token for the user.
   *
   * @param user
   */
  async login(user: any): Promise<object> {
    const payload = { user: user, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  /**
   * Register a new user
   *
   * @param dto
   */
  async register(dto: CreateUserDTO): Promise<UserModel> {
    return await this.usersService.create(dto);
  }
}
