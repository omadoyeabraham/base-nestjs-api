import * as Knex from 'knex';

const tableName = 'users';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments();
    t.uuid('uuid');
    t.string('first_name');
    t.string('last_name');
    t.string('username').unique();
    t.string('email').unique();
    t.string('password');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
