const functions = require('firebase-functions');
const express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var createError = require('http-errors');

var getPlayerRouter = require('./routes/getPlayer');
var getPlayerAllRouter = require('./routes/getPlayerAll');
var registerPlayerRouter = require('./routes/registerPlayer');
var pickCellRouter = require('./routes/pickCell');
var getPickCellsRouter = require('./routes/getPickedCells');
var jwtAuth = require('./routes/jwtAuth');
var login = require('./routes/login');
var playerLogin = require('./routes/playerLogin');

var firebaseAdmin = require('./firestore');

const app = express();

var db = firebaseAdmin();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/',cors());
app.use('/login',login(db));
app.use('/player-login',playerLogin(db));
app.use('/api',jwtAuth);
app.use('/api/get-player', getPlayerRouter(db));
app.use('/api/get-player-all', getPlayerAllRouter(db));
app.use('/api/register-player', registerPlayerRouter(db));
app.use('/api/pick-cell', pickCellRouter(db));
app.use('/api/get-picked-cells', getPickCellsRouter(db));

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