import { Model } from 'objection';

import { BaseModel } from '../models/base.model';

export abstract class BaseModelFactory {
  ModelClass = BaseModel;

  /**
   * Function used to return the data fields in a single model.
   * It must be implemented by an class extending this one.
   */
  static modelFields() {
    return {};
  }

  static modelClass() {
    return Model;
  }

  /**
   * Make  model record(s) (but don't save into the database)
   *
   * @param numberOfRecords
   * @param overrideFields
   */
  static make(numberOfRecords = 1, overrideFields = {}) {
    if (numberOfRecords == 1) {
      return {
        ...this.modelFields(),
        ...overrideFields,
      };
    } else if (numberOfRecords > 1) {
      const records = [];
      for (let i = 0; i < numberOfRecords; i++) {
        records.push({
          ...this.modelFields(),
          ...overrideFields,
        });
      }

      return records;
    }
  }

  /**
   * Create model records in the database.
   *
   * @param numberOfRecords
   * @param overrideFields
   */
  static create(numberOfRecords = 1, overrideFields = {}) {
    const records = [];

    for (let i = 0; i < numberOfRecords; i++) {
      records.push({
        ...this.modelFields(),
        ...overrideFields,
      });
    }

    return this.modelClass()
      .query()
      .insert(records);
  }
}
