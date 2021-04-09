var express = require('express');
var router = express.Router();

var functions = require('../firestore/functions')

/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
  const {roomId, userId} = req.credentials;

  let docs = [];
    try {
        docs = await functions.getCollection(db, roomId);
    } catch (e) {
        console.log(e);
    };

    let players = [];

    docs.forEach(doc=> {
        if (!doc.player) return;
        
        const {id, name, email, cards, timestamp} = doc.player;
  
        const playerDetails = {
            id,
            name,
            email,
        };
        
        const cards_parsed = cards.map(i=>({id: i.id, cells: JSON.parse(i.cells)}));

        players.push({
            player: playerDetails, 
            cards: cards_parsed,
            timestamp
        });
    });

    const sortingFx = (a,b) => (a.timestamp - b.timestamp);

    players.sort(sortingFx);
    
  res.send({
    data:{
      players
    },
    oMessage: 'Success',
    oFlag: 1
});
});

module.exports = dbContainer;
