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

module.exports = server;
