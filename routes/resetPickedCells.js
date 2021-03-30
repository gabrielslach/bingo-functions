var express = require('express');
var router = express.Router();

var jsonWebToken = require('jsonwebtoken');

var functions = require('../firestore/functions');


/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
  const {roomId, userId} = req.credentials;
    
  try {
      doc = await functions.updateField(db, `${roomId}`, 'roomConfig', {pickedCells: []});
  } catch (e) {
      console.log(e);
      res.sendStatus(500);
  };

  res.send({
    oMessage: 'Success',
    oFlag: 1
  });
    
});

module.exports = dbContainer;
