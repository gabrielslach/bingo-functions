var express = require('express');
var router = express.Router();

var jsonWebToken = require('jsonwebtoken');

var functions = require('../firestore/functions');


/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
  const {roomId, userId} = req.credentials;
  //search for player using playerID
  let doc = {};
    try {
        doc = await functions.getDoc(db, `${roomId}`, 'roomConfig');
    } catch (e) {
        console.log(e);
    };

  const rangeStart = 1;
  const rangeEnd = 75;
  let randomInt = 0;

  const {pickedCells} = doc;

  if (pickedCells.length === 75) {
    res.send({
      data: {
        pickedCells: pickedCells_temp
      },
      oMessage: 'Success',
      oFlag: 1
    });
    return;
  };

  const pickedCells_temp = [...pickedCells];
  const unpickedCells = [];

  for (let i = rangeStart; i <= rangeEnd; i++) {
    if (!pickedCells_temp.includes(i)) {
      unpickedCells.push(i);
    };
  };

  const randomFloat = Math.random();
  randomInt = Math.floor(randomFloat * (unpickedCells.length));

  if (randomInt < unpickedCells.length) {
    pickedCells_temp.push(unpickedCells[randomInt]);
  } else {
    pickedCells_temp.push(unpickedCells[unpickedCells.length - 1]);
  }
    
  try {
      doc = await functions.updateField(db, `${roomId}`, 'roomConfig', {pickedCells: pickedCells_temp});
  } catch (e) {
      console.log(e);
      res.sendStatus(500);
  };

  res.send({
    data: {
      pickedCells: pickedCells_temp
    },
    oMessage: 'Success',
    oFlag: 1
  });
    
});

module.exports = dbContainer;
