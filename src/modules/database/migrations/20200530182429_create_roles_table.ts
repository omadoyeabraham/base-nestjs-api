import * as Knex from 'knex';

const tableName = 'roles';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments();
    t.string('name');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
