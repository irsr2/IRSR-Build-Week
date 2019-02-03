exports.up = function(knex, Promise) {
  return knex.schema.createTable('boardLog', tbl => {
    tbl.increments();
    tbl.integer('equipmentId').notNullable();
    tbl.integer('status').notNullable();
    tbl
      .integer('user')
      .references('id')
      .inTable('user')
      .notNullable();
    tbl.string('comment');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('boardLog');
};
