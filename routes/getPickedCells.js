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


    res.send({
      data: {
        pickedCells: doc.pickedCells
      },
      oMessage: 'Success',
      oFlag: 1
    })
    
});

module.exports = dbContainer;
