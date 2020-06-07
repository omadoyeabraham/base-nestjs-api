import * as Knex from 'knex';

const tableName = 'role_user';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments();

    t.integer('role_id')
      .references('id')
      .inTable('roles');

    t.integer('user_id')
      .references('id')
      .inTable('users');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
