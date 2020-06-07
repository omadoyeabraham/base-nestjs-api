import { BaseModel } from '@modules/database';

export class BaseModelFactory {
  static modelFields() {
    return {};
  }

  static ModelClass = BaseModel;

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

  static create(numberOfRecords = 1, overrideFields = {}) {
    const records = [];

    for (let i = 0; i < numberOfRecords; i++) {
      records.push({
        ...this.modelFields(),
        ...overrideFields,
      });
    }

    return this.ModelClass.query().insert(records);
  }
}
