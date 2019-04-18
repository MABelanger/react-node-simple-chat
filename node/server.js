var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var path = require('path');
var fs = require('fs');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy
var FileStore = require('session-file-store')(session);
var utils = require('./utils');
var dotenv = require('dotenv');


var audioUtils = require('./audio/utils');
var messageUtils = require('./message/utils');


// read .env file and add it to process.env
dotenv.config();
// use the default env if .env is not set.
if(!(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production")) {
  utils.overwriteEnv('.env.default.development')
}

if(process.env.USERS){
  USERS = JSON.parse(process.env.USERS);
}

var socketListners = require('./socketListners')();

function sendMessagesJson(res) {
  var usersFilePath = path.join(__dirname, '/db/messages.json');
  fs.access(usersFilePath, fs.constants.F_OK, (err) => {
    if(err) {
      res.json([]);
    } else {
      var readable = fs.createReadStream(usersFilePath);
      readable.pipe(res);
    }
  });
}

function sendUserJson(res, user) {
  return res.status(200).json(user);
}

function sendNeedToLogin(res) {
  var error = {
    error : 'need to login!'
  }
  return res.status(401).json(error);
}

// body-parser for retrieving form data
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Headers to enable Cross-origin resource sharing (CORS)
var middlewareCors = require('./middlewares/cors');
var middlewareUserAgent = require('./middlewares/userAgent');

app.use(middlewareCors);
app.use(middlewareUserAgent);

var configSession = {
  store: new FileStore(),
  secret: process.env.SESSION_SECRET,
  proxy: true,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    secure: process.env.NODE_ENV !== "development"
  }
};

app.use(session(configSession));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  var validUserId = null;
  for(var i=0; i<USERS.length; i++) {
    if(id == USERS[i].id) {
      done(null, USERS[i]);
    }
  }
});

passport.use('local', new LocalStrategy(
  function (username, password, done) {
    for(var i=0; i<USERS.length; i++) {
      if (username === USERS[i].username && password === USERS[i].password) {
        return done(null, USERS[i]);
      }
    }
    return done(null, false, {"message": "User not found."});
  })
);

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(error, user, info) {
    if(error) {
      return res.status(500).json(error);
    }
    if(!user) {
      var error = {
        error : 'wrong user or password'
      }
      return res.status(401).json(error);
    }
    req.login(user, function(err){
      res.json({user: user});
    });
  })(req, res, next);
});


io.on("connection", function(client) {
  socketListners.applyClient(client);
  app.post('/audio', function(req, res, next) {
      const message = req.body;
      const { username, date, content, dataUri } = message;
      audioUtils.saveAudio(dataUri, username)
        .then((audioUrl)=>{
          console.log('success saved audio');
          const stripedDataUriMessage = {
            username,
            date,
            content,
            audioUrl
          };
          messageUtils.appendNewMessage(stripedDataUriMessage, function cb() {
            client.emit("thread", stripedDataUriMessage);
            client.broadcast.emit("thread", stripedDataUriMessage);
          })
          res.status(200).json({result: 'hello'});
        })
  });
});



app.use(express.static("public"));

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    else {
      res.redirect('/');
    }
}

function logMedia(req, res, next) {

  let log = {
    date: new Date(new Date().getTime() - 1000*60*60*4),
    username: req.user.username,
    url: req.url,
    userAgent: res.locals.ua
  };

  console.log('log', JSON.stringify(log));

  return next();

}
app.use('/media', isAuthenticated, logMedia, express.static('media'))

// private messages.json
app.get('/messages.json', function(req, res){
  var isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    sendMessagesJson(res);
  } else {
    sendNeedToLogin(res);
  }
});

app.get('/user', function(req, res){
  var isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    let user = req.user;
    console.log('user', user);
    console.log('res.locals.ua', res.locals.ua);
    sendUserJson(res, user);
  } else {
    sendNeedToLogin(res);
  }
});

app.get("*", function(req, res, next) {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(process.env.PORT);

console.log('server listen on *:' + process.env.PORT)
