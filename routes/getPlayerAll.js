var express = require('express');
var router = express.Router();

var functions = require('../firestore/functions')

/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
  //search for player using playerID
  let docs = [];
    try {
        docs = await functions.getCollection(db, 'UPSCA');
    } catch (e) {
        console.log(e);
    };

    const players = [];

    docs.forEach(doc=> {
        if (!doc.player) return;
        
        const {id, name, email, code, cards} = doc.player;
  
        const playerDetails = {
            id,
            name,
            email,
            code
        };
        
        const cards_parsed = cards.map(i=>({id: i.id, cells: JSON.parse(i.cells)}));

        players.push({
            player: playerDetails, 
            cards: cards_parsed
        });
    });
    
  res.send({
    data:{
      players
    },
    oMessage: 'Success',
    oFlag: 1
});
});

module.exports = dbContainer;
