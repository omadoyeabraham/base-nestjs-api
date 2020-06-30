import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '@src/constants';
import { BaseModel } from './base.model';
import { RoleModel } from './role.model';

export class UserModel extends BaseModel {
  static tableName = 'users';

  /**
   * Set the uuid and hash the password before a user is created.
   *
   * @param context
   */
  async $beforeInsert(context) {
    this.uuid = uuidv4();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  }

  /**
   * Secure fields which should not be exposed when returning user instances
   */
  get $secureFields(): string[] {
    return ['password'];
  }

  // MODEL COLUMNS
  id!: number;
  uuid!: string;
  first_name: string;
  last_name: string;
  username!: string;
  email!: string;
  password: string;

  // RELATIONSHIPS
  roles!: RoleModel[];

  /**
   * Define relationships
   */
  static get relationMappings() {
    const RoleModel = require('./role.model').RoleModel;

    return {
      roles: {
        modelClass: RoleModel,
        relation: Model.ManyToManyRelation,
        join: {
          from: 'users.id',
          through: {
            from: 'role_user.user_id',
            to: 'role_user.role_id',
          },
          to: 'roles.id',
        },
      },
    };
  }

  /**
   * Used for input validation whenever a model instance is created explicitly or implicitly
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'username'],
      properties: {
        id: { type: 'integer' },
        uuid: { type: 'uuid' },
        first_name: { type: 'string', minLength: 1, maxLength: 255 },
        last_name: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'email', minLength: 1, maxLength: 255 },
        password: { type: 'email', minLength: 6, maxLength: 255 },
      },
    };
  }
}
