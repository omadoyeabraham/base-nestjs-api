import { Model } from 'objection';
import * as lodash from 'lodash';

/**
 * Base model class which all other Objection.js Model classes should extend
 */
export abstract class BaseModel extends Model {
  readonly id: number;

  /**
   * Secure fields which should not be exposed when returning model instances
   */
  get $secureFields(): string[] {
    return [];
  }

  /**
   * Omit secure fields when returning model data
   *
   * @param json
   */
  $formatJson(json) {
    json = super.$formatJson(json);
    return lodash.omit(json, this.$secureFields);
  }
}
