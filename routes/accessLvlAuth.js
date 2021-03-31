var express = require('express');
var router = express.Router();

router.use(async function(req, res, next) {
  const {roomId, userId} = req.credentials;
  console.log(userId)
  if (userId !== 'admin') {
    res.sendStatus(401); 
  } else {
    next();
  }; 
});

module.exports = router;
