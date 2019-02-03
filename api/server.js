const express = require('express');

// const equipment = require('../equipment/equipment');

const server = express();

const db = require('../data/dbConfig');

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Working!' });
});

server.get('/statusTypes', async (req, res) => {
  try {
    const status = await db('statusTypes');
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/equipmentType', async (req, res) => {
  try {
    const status = await db('equipmentType');
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/equipment', async (req, res) => {
  try {
    const types = await db
      .from('equipment')
      .select('*')
      .innerJoin('equipmentType', 'equipment.id', 'equipmentType.id');
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/users', async (req, res) => {
  try {
    const userRoles = await db
      .from('user')
      .select('*')
      .innerJoin('role', 'user.role', 'role.id');
    res.status(200).json(userRoles);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/schoolLog', async (req, res) => {
  try {
    const logJoined = await db
      .from('schoolLog')
      .select('*')
      .innerJoin('equipmentType', 'schoolLog.equipmentID', 'equipmentType.id')
      .innerJoin('user', 'schoolLog.user', 'user.id')
      .innerJoin('role', 'user.role', 'role.id');
    res.status(200).json(logJoined);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/boardLog', async (req, res) => {
  try {
    const logJoined = await db
      .from('boardLog')
      .select('*')
      .innerJoin('equipmentType', 'boardLog.equipmentID', 'equipmentType.id')
      .innerJoin('user', 'boardLog.user', 'user.id')
      .innerJoin('role', 'user.role', 'role.id')
      .innerJoin('statusTypes', 'boardLog.status', 'statusTypes.statusID');
    res.status(200).json(logJoined);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post('/boardLog', async (req, res) => {
  try {
    const ids = await db('boardLog').insert(req.body);
    console.log('IDS =', ids);
    res.status(201).json(ids);
  } catch (error) {
    console.log('ERROR', error);
  }
});

server.post('/schoolLog', async (req, res) => {
  try {
    const ids = await db('schoolLog').insert(req.body);
    console.log('req body =', req.body);
    res.status(201).json(`Added new log with is ${ids}`);
  } catch (error) {
    console.log('ERROR', error);
  }
});

server.put('/equipment/:id', async (req, res) => {
  try {
    const changes = req.body;
    const myUpdate = await db('equipment')
      .where({ id: req.params.id })
      .update(changes);
    console.log('Changes', changes);
    console.log('my update', myUpdate);
    res.status(200).json(myUpdate);
  } catch (error) {
    console.log('ERROR', error);
  }
});

// router.put('/:id', async (req, res) => {
//   try {
//     const changes = req.body;
//     const myUpdate = await db('project')
//       .where({ id: req.params.id })
//       .update(changes);
//     if (!myUpdate) {
//       res
//         .status(responseStatus.badRequest)
//         .json({ message: 'This ID does not exist in the database.' });
//     } else {
//       res.status(responseStatus.success).json(myUpdate);
//     }
//   } catch (error) {
//     res
//       .status(responseStatus.badRequest)
//       .json({ errorMessage: 'Unable to update that project.' });
//   }
// });

module.exports = server;
