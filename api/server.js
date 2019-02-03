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

// router.post('/', async (req, res) => {
//   try {
//     const ids = await db('project').insert(req.body);
//     const projectResponse = await db('project').where({ id: ids[0] });
//     res.status(responseStatus.postCreated).json(projectResponse);
//   } catch (error) {
//     res
//       .status(responseStatus.serverError)
//       .json({ message: 'Error adding project.' });
//   }
// });

module.exports = server;
