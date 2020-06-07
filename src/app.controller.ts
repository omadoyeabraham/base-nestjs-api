import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  homepape(): object {
    return {
      message: 'Welcome to the Nest.js API',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
