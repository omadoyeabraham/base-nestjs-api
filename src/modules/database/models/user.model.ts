import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as lodash from 'lodash';

import { BaseModel } from './base.model';
import { RoleModel } from './role.model';
import { SALT_ROUNDS } from '../../../costants';

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

  get $secureFields(): string[] {
    return ['password'];
  }

  // omit stuff when creating json response from model
  $formatJson(json) {
    json = super.$formatJson(json);
    return lodash.omit(json, this.$secureFields);
  }

  // MODEL COLUMNS
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;

  // RELATIONSHIPS
  roles: RoleModel[];

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
}
