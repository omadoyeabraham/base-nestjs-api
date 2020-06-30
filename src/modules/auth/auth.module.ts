import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from '@modules/users';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const jwtTTL = configService.get('auth.jwtTTL');

        return {
          secret: configService.get('auth.jwtSecret'),
          signOptions: { expiresIn: `${jwtTTL}s` },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtAuthGuard],
  exports: [
    LocalAuthGuard,
    JwtAuthGuard,
    JwtModule,
    PassportModule,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {
  constructor(private configService: ConfigService) {}
}
