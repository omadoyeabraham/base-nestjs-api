import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtTTL: process.env.JWT_TTL,
  defaultStrategy: process.env.AUTH_DEFAULT_STRATEGY || 'jwt',
}));
