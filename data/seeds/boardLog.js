exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('boardLog')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('boardLog').insert([
        { equipmentID: 1, status: 1, user: 2 },
        { equipmentID: 3, status: 2, user: 1 },
        {
          equipmentID: 4,
          status: 3,
          user: 1,
          comment: 'Insuficient budget to fix item'
        }
      ]);
    });
};
