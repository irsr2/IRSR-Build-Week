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
    console.log('Status =', status);
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/equipmentType', async (req, res) => {
  try {
    const status = await db('equipmentType');
    console.log('Status =', status);
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/equipment', async (req, res) => {
  try {
    const data = await db('equipment');
    console.log('Data =', data);
    const types = await db
      .from('equipment')
      .select('*')
      .innerJoin('equipmentType', 'equipment.id', 'equipmentType.id');
    console.log('Types', types);
    res.status(200).json(types);
  } catch (error) {
    console.log('Error from the get', error);
    res.status(500).json(error);
  }
});

server.get('/users', async (req, res) => {
  try {
    const user = await db('user');
    console.log('Data =', user);
    const userRoles = await db
      .from('user')
      .select('*')
      .innerJoin('role', 'user.role', 'role.id');
    console.log('Types', userRoles);
    res.status(200).json(userRoles);
  } catch (error) {
    console.log('Error from the get', error);
    res.status(500).json(error);
  }
});

module.exports = server;
