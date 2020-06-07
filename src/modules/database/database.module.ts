import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { UserModel } from '@modules/database/models/user.model';
import { RoleModel } from '@modules/database/models/role.model';
import { KNEX_CONNECTION } from '@src/costants';

const models = [UserModel, RoleModel];

const modelProviders = models.map(model => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    inject: [ConfigService],
    provide: KNEX_CONNECTION,
    useFactory: async (configService: ConfigService) => {
      const isTesting = process.env.NODE_ENV === 'testing';
      let connection = {};
      let client = 'pg';
      let useNullAsDefault = false;

      if (isTesting) {
        client = 'sqlite3';
        useNullAsDefault = true;
        connection = {
          filename: './mydb.sqlite',
        };
      } else {
        {
          connection = {
            host: configService.get('DB_HOST', 'localhost'),
            user: configService.get('DB_USERNAME', 'postgres'),
            password: configService.get('DB_PASSWORD', 'postgres'),
            database: configService.get('DB_DATABASE', 'prism'),
            port: configService.get<number>('DB_PORT', 5432),
          };
        }
      }
      const knex = Knex({
        client,
        debug: configService.get<boolean>('APP_DEBUG', false),
        connection: connection,
        useNullAsDefault,
        ...knexSnakeCaseMappers(),
      });

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  imports: [ConfigModule],
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
