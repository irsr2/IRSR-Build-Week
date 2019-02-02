exports.up = function(knex, Promise) {
  return knex.schema.createTable('schoolLog', tbl => {
    tbl.increments();
    tbl.integer('equipmentId', 255).notNullable();
    tbl.boolean('broken').notNullable();
    tbl
      .integer('user')
      .references('id')
      .inTable('user')
      .notNullable();
    tbl.string('comment');
    tbl.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('schoolLog');
};
