const functions = require('firebase-functions');
const express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')({origin: true});
var createError = require('http-errors');
var path = require('path');

var createRoomRouter = require('./routes/createRoom');
var getPlayerRouter = require('./routes/getPlayer');
var getPlayerAllRouter = require('./routes/getPlayerAll');
var registerPlayerRouter = require('./routes/registerPlayer');
var addCardRouter = require('./routes/addCard');
var pickCellRouter = require('./routes/pickCell');
var getPickedCellsSequenceRouter = require('./routes/getPickCellSequence');
var getPickedCellsRouter = require('./routes/getPickedCells');
var resetPickedCellsRouter = require('./routes/resetPickedCells.js');
var deletePlayerRouter = require('./routes/deletePlayer');
var deleteCardRouter = require('./routes/deleteCard');
var jwtAuth = require('./routes/jwtAuth');
var accessLvlAuth = require('./routes/accessLvlAuth');
var login = require('./routes/login');
var playerLogin = require('./routes/playerLogin');

var firebaseAdmin = require('./firestore');

const app = express();

var db = firebaseAdmin();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/',cors);
app.use('/api/create-room', createRoomRouter(db));
app.use('/api/login',login(db));
app.use('/api/player-login',playerLogin(db));
app.use('/api',jwtAuth);
app.use('/api/get-player', getPlayerRouter(db));
app.use('/api',accessLvlAuth);
app.use('/api/get-player-all', getPlayerAllRouter(db));
app.use('/api/register-player', registerPlayerRouter(db));
app.use('/api/pick-cell', pickCellRouter(db));
app.use('/api/pick-cell-beta', getPickedCellsSequenceRouter(db));
app.use('/api/get-picked-cells', getPickedCellsRouter(db));
app.use('/api/reset-picked-cells', resetPickedCellsRouter(db));
app.use('/api/delete-player', deletePlayerRouter(db));
app.use('/api/delete-card', deleteCardRouter(db));
app.use('/api/add-card', addCardRouter(db));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

exports.app = functions.https.onRequest(app)
module.exports = app;