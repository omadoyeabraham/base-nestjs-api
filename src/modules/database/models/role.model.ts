import { BaseModel } from './base.model';

export class RoleModel extends BaseModel {
  static tableName = 'roles';

  // MODEL COLUMNS
  name: string;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      },
    };
  }
}
