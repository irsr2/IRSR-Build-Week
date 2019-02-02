exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('equipment')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('equipment').insert([
        { type: 1, broken: false },
        { type: 1, broken: false },
        { type: 3, broken: false },
        { type: 5, broken: true },
        { type: 2, broken: false },
        { type: 4, broken: true }
      ]);
    });
};

// router.get('/:id/action', async (req, res) => {
//   try {
//     const project = await db('project')
//       .select('id', 'name', 'description', 'completed')
//       .where({ id: req.params.id });
//     const projectActions = await db
//       .from('project')
//       .select(
//         'action.id',
//         'action.description',
//         'action.notes',
//         'action.completed'
//       )
//       .innerJoin('action', 'project.id', 'action.action_id')
//       .where('action.action_id', req.params.id);
//     const myProject = { ...project[0], actions: projectActions };
//     res.status(responseStatus.success).json(myProject);
//   } catch (error) {
//     res
//       .status(responseStatus.serverError)
//       .json({ message: 'Error retreiving data.' });
//   }
// });
