var express = require('express');
var router = express.Router();

var cardObj = require("../objTypes/cardObj");

var functions = require('../firestore/functions');


/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
  const {roomId, userId} = req.credentials;
  const {playerId, noOfCards} = req.body;
  
  let doc = {};
  let existingDocIds = {};

    try {
        doc = await functions.getDoc(db, `${roomId}`, `${playerId}`);
        existingDocIds = await functions.getIds(db, 'UPSCA');
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
        return;
    };

    const {player} = doc;
    
    if (!player) {
      res.send({
        oMessage: 'Player non existent.',
        oFlag: 1
      });
      return;
    };

    
    const {cardIds} = existingDocIds;
    const {cards} = player;
    
    const cards_new = generateCards(noOfCards, cardIds);
    
    try {
      doc = await functions.updateField(db, `${roomId}`, `${playerId}`, {player: {...player, cards: [...cards, ...cards_new]}});
  } catch (e) {
      console.log(e);
      res.sendStatus(500);
      return;
  };

    res.send({
      oMessage: 'Success',
      oFlag: 1
    })
    
});

const generateCards = (noOfCards, existingCardIds = []) => {
  const cards = [];
  const existingCardIds_copy = [...existingCardIds]

  for (let i = 0; i < noOfCards; i++) {
    let card;
    do {
      card = cardObj();
    } while (existingCardIds_copy.includes(card.id));
    cards.push(card);
    existingCardIds_copy.push(card.id);
  };

  return cards;
}

module.exports = dbContainer;
