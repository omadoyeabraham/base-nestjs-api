import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
} from '@nestjs/common';

import { CreateUserDTO } from '@modules/users';
import { UserModel } from '@modules/database';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Login a user
   *
   * @param req
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * Register a new user
   *
   * @param dto
   */
  @Post('register')
  async register(@Body() dto: CreateUserDTO): Promise<UserModel> {
    return await this.authService.register(dto);
  }

  /**
   * Get the authenticated user details
   *
   * @param req
   */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
