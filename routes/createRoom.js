var express = require('express');
var router = express.Router();
var https = require('https');

var roomObj = require('../objTypes/roomObj');

var functions = require('../firestore/functions');

var credentials = require('../credentials');

const verifyCaptcha = (captchaToken) => new Promise( async (resolve, reject) => {
  const options = {
    hostname: 'www.google.com',
    path: `/recaptcha/api/siteverify?secret=${credentials.captchaSecret}&response=${captchaToken}`,
    method: 'POST',
  };
  
  const req1 = https.request(options, (res1) => {
    res1.setEncoding('utf8');
    res1.on('data', (chunk) => {
      const isCaptchaSuccess = JSON.parse(chunk).success;
      resolve(isCaptchaSuccess);
    });
  });
  
  req1.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    reject();
  });
  
  // Write data to request body
  req1.write('');
  req1.end();
});

/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
  const {captchaToken} = req.body;

  const isCaptchValid = await verifyCaptcha(captchaToken);

  if (!isCaptchValid) {
    res.sendStatus(401);
    return;
  }
  
  const existingRoomIds = await functions.getCollections(db);

  const room = roomObj(existingRoomIds);
  const {id, roomConfig} = room;

  try {
    await functions.writeData(db, id, 'roomConfig', roomConfig);
  } catch (error) {
    console.log('create room', error);
    res.sendStatus(500);
    return;
  }

  res.send({
    data:{
      roomId: id,
      password: roomConfig.password
    },
    oMessage: 'Success',
    oFlag: 1
});
});

module.exports = dbContainer;
