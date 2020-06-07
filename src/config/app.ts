import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'APP NAME',
  url: process.env.APP_URL || 'http://localhost',
  port: parseInt(process.env.APP_PORT, 10) || 3000,
}));
