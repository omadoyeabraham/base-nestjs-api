import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  /**
   * Default database connection
   */
  default: process.env.DB_CONNECTION || 'postgres',

  /**
   * Database connections
   */
  connections: {
    /**
     * Mysql database connection
     */
    mysql: {
      connectionType: 'mysql',
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      database: process.env.DB_DATABASE || 'default_database',
      username: process.env.DB_USERNAME || 'default_db_username',
      password: process.env.DB_PASSWORD || 'default_db_password',
    },

    /**
     * Postgres database connection
     */
    postgres: {
      connectionType: 'postgres',
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      database: process.env.DB_DATABASE || 'default_database',
      username: process.env.DB_USERNAME || 'default_db_username',
      password: process.env.DB_PASSWORD || 'default_db_password',
    },

    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      password: process.env.REDIS_PASSWORD || '',
    },
  },
}));
