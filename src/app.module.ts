import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import appConfig from './config/';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';

/**
 * The root module for the entire API.
 */
@Module({
  imports: [
    /**
     * Setup config module using environment variables.
     *
     * It loads our environment variables from envs/.env and also stores them in a private data structure that can be accessed through
     * the ConfigService
     */
    ConfigModule.forRoot({
      // Sets the file path for the env file that is loaded
      envFilePath: ['.env'],

      // Makes the ConfigService module global so other feature modules can use it without explicitly importing it
      isGlobal: true,

      // Add support for environment variable expansion
      expandVariables: true,

      // Load our app configuration files
      load: appConfig,
    }),

    /**
     * Setup GraphQL module
     */
    // GraphQLModule.forRoot({
    //   autoSchemaFile: 'schema.gql',
    //   context: ({ req }) => ({ req }),
    // }),

    AuthModule,
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
