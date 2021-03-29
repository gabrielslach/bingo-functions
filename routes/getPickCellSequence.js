var express = require('express');
var router = express.Router();

var jsonWebToken = require('jsonwebtoken');

var functions = require('../firestore/functions');


/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
  const {roomId, userId} = req.credentials;

  const rangeStart = 1;
  const rangeEnd = 75;
  let randomInt = 0;

  const pickedCells = [];
  const unpickedCells = [];

  for (let i = rangeStart; i <= rangeEnd; i++) {
      unpickedCells.push(i);
  };

  do {
    const randomFloat = Math.random();
    randomInt = Math.floor(randomFloat * (unpickedCells.length));

    if (randomInt < unpickedCells.length) {
      pickedCells.push(unpickedCells[randomInt]);
      unpickedCells.splice(randomInt, 1);
    } else {
      pickedCells.push(unpickedCells[unpickedCells.length - 1]);
      unpickedCells.splice(unpickedCells.length - 1, 1);
    }
  } while (unpickedCells.length > 0);
    
  try {
      doc = await functions.updateField(db, `${roomId}`, 'roomConfig', {pickedCells});
  } catch (e) {
      console.log(e);
      res.sendStatus(500);
  };

  res.send({
    data: {
      pickedCells
    },
    oMessage: 'Success',
    oFlag: 1
  });
    
});

module.exports = dbContainer;
