var express = require('express');
var router = express.Router();

var jsonWebToken = require('jsonwebtoken');

var functions = require('../firestore/functions')

const credentials = require('../credentials');

/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
    const {roomId = null, userId = null, email = null, playerCode = null} = req.body;
    let doc = {};
    
    try {
      doc = await functions.getDoc(db, `${roomId}`, `${userId}`);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    };
    
    if (doc && doc.player && doc.player.code === playerCode) {
      jsonWebToken.sign({roomId, userId, email}, credentials.secretKey, (err, token) => {
        if (err || !token) {
          res.sendStatus(500);
          return;
        }

        res.send({
          data: {loginToken: token, roomId, userId},
          oFlag: 1,
          oMessage: 'Login Success'
        })
        return;
      });
    } else {
      res.send({
        oFlag: 0,
        oMessage: 'Invalid Player Id or Player Code.'
      })
      return;
    }
});

module.exports = dbContainer;
