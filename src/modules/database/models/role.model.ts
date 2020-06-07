import { BaseModel } from './base.model';

export class RoleModel extends BaseModel {
  static tableName = 'roles';

  // MODEL COLUMNS
  name: string;
}
