var express = require('express');
var router = express.Router();

var cardObj = require('../objTypes/cardObj')
var playerObj = require('../objTypes/playerObj')

var functions = require('../firestore/functions')

/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
  const {roomId} = req.credentials;
  const {name, email, noOfCards} = req.body;
  
  const existingDocIds = await functions.getIds(db, roomId);
  const {playerIds, cardIds} = existingDocIds;

  const cards = generateCards(noOfCards, cardIds);
  
  const player = playerObj(cards, name, email, playerIds);

  await functions.writeData(db, roomId, player.id, {player});

  res.send({
    data:{
      player
    },
    oMessage: 'Success',
    oFlag: 1
});
});

const generateCards = (noOfCards, existingCardIds) => {
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
