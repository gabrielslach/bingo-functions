var express = require('express');
var router = express.Router();

var functions = require('../firestore/functions')


/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
  const {roomId, playerId} = req.body;
  
    try {
        await functions.deleteDocument(db, roomId, playerId);
    } catch (e) {
        console.log(e);
    }
    
  res.send({
    oMessage: 'Success',
    oFlag: 1
});
});

module.exports = dbContainer;
