var express = require('express');
var router = express.Router();

var jsonWebToken = require('jsonwebtoken');

var functions = require('../firestore/functions');


/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
  const {roomId, userId} = req.credentials;
  const {cardId, playerId} = req.body;
  
  let doc = {};
    try {
        doc = await functions.getDoc(db, `${roomId}`, `${playerId}`);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    };

    const {player} = doc;
    
    if (!player) {
      res.send({
        oMessage: 'Player non existent.',
        oFlag: 1
      });
      return;
    };
    
    const filterFx = (item) => {
      return `${item.id}` !== cardId;
    };
    
    const cards = player.cards.filter(filterFx);

    if (cards.length === player.cards.length) {
      res.send({
        oMessage: 'No card to delete.',
        oFlag: 1
      });
      return;
    }
    
    try {
      doc = await functions.updateField(db, `${roomId}`, `${playerId}`, {player: {...player, cards}});
  } catch (e) {
      console.log(e);
      res.sendStatus(500);
  };

    res.send({
      oMessage: 'Success',
      oFlag: 1
    })
    
});

module.exports = dbContainer;
