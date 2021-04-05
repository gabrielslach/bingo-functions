var express = require('express');
var router = express.Router();

var jsonWebToken = require('jsonwebtoken');

var functions = require('../firestore/functions')

const credentials = require('../credentials');

/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
    const {roomId = null,email = null, password = null} = req.body;
    const userId = 'admin';
    let doc = {};
    try {
      doc = await functions.getDoc(db, roomId, 'roomConfig');
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    };

    if (doc && doc.password === password) {
      jsonWebToken.sign({roomId, userId, email}, credentials.secretKey, (err, token) => {
        if (err || !token) {
          res.sendStatus(500);
          return;
        }

        res.send({
          data: {loginToken: token, userId, roomId},
          oFlag: 1,
          oMessage: 'Login Success'
        })
        return;
      });
    } else {
      res.send({
        oFlag: 0,
        oMessage: 'Invalid password.'
      })
      return;
    }
});

module.exports = dbContainer;
