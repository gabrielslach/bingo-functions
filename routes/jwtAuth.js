var express = require('express');
var router = express.Router();

var jsonWebToken = require('jsonwebtoken');

const credentials = require('../credentials');

/* GET users listing. */
router.use('/', function(req, res, next) {
    const authHeader = req.headers["authorization"];
    const bodyRoomId = req.body.roomId;
    const bodyUserId = req.body.userId;

    if (typeof authHeader === "undefined") res.sendStatus(403);
    else {
      const loginToken = authHeader.split(" ")[1];
      jsonWebToken.verify(loginToken, credentials.secretKey, (err, decoded) => {
        if (err || !decoded) {
          res.sendStatus(403);
          return;
        };

        const {roomId, userId, email} = decoded;

        if (!roomId || !(bodyRoomId === roomId) || !(bodyUserId === userId)) {
          res.sendStatus(401);
          return;
        };

        req.credentials = {
            roomId,
            userId,
            email
        };

        next();
      });
    }
});

module.exports = router;
