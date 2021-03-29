const functions = require('firebase-functions');
const express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')({origin: true});
var createError = require('http-errors');
var path = require('path');

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/app/',cors);
app.use('/app/login',login(db));
app.use('/app/player-login',playerLogin(db));
app.use('/app/api',jwtAuth);
app.use('/app/api/get-player', getPlayerRouter(db));
app.use('/app/api/get-player-all', getPlayerAllRouter(db));
app.use('/app/api/register-player', registerPlayerRouter(db));
app.use('/app/api/pick-cell', pickCellRouter(db));
app.use('/app/api/get-picked-cells', getPickCellsRouter(db));

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