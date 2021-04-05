var express = require('express');
var router = express.Router();

var functions = require('../firestore/functions')


/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
  const {roomId, userId} = req.credentials;
  //search for player using playerID
  let doc = {};
    try {
        doc = await functions.getDoc(db, roomId, userId);
    } catch (e) {
        console.log(e);
    }

    if (!doc) {
      res.sendStatus(401);
      return;
    };

    const {id, name, email, cards} = doc.player;
  
    const playerDetails = {
        id,
        name,
        email
    };
    
    const cards_parsed = cards.map(i=>({id: i.id, cells: JSON.parse(i.cells)}));
    
  res.send({
    data:{
      player: playerDetails,
      cards: cards_parsed
    },
    oMessage: 'Success',
    oFlag: 1
});
});

module.exports = dbContainer;
