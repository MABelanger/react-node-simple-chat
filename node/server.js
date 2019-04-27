const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy
const FileStore = require('session-file-store')(session);
const utils = require('./utils');
const dotenv = require('dotenv');


const audioUtils = require('./audio/utils');
const messageUtils = require('./message/utils');


// read .env file and add it to process.env
dotenv.config();
// use the default env if .env is not set.
if(!(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production")) {
  utils.overwriteEnv('.env.default.development')
}

if(process.env.USERS){
  USERS = JSON.parse(process.env.USERS);
}

let socketListners = require('./socketListners')();

function sendMessagesJson(res) {
  let usersFilePath = path.join(__dirname, '/db/messages.json');
  fs.access(usersFilePath, fs.constants.F_OK, (err) => {
    if(err) {
      res.json([]);
    } else {
      let readable = fs.createReadStream(usersFilePath);
      readable.pipe(res);
    }
  });
}

function sendUserJson(res, user) {
  return res.status(200).json(user);
}

function sendNeedToLogin(res) {
  let error = {
    error : 'need to login!'
  }
  return res.status(401).json(error);
}

// body-parser for retrieving form data
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Headers to enable Cross-origin resource sharing (CORS)
let middlewareCors = require('./middlewares/cors');
let middlewareUserAgent = require('./middlewares/userAgent');

app.use(middlewareCors);
app.use(middlewareUserAgent);

let configSession = {
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
  let validUserId = null;
  for(let i=0; i<USERS.length; i++) {
    if(id == USERS[i].id) {
      done(null, USERS[i]);
    }
  }
});

passport.use('local', new LocalStrategy(
  function (username, password, done) {
    for(let i=0; i<USERS.length; i++) {
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
      let error = {
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
      const { username, sendDateIso, content, dataUri } = message;
      audioUtils.saveAudio(dataUri, username)
        .then((audioUrl)=>{
          console.log('success saved audio:', audioUrl);
          const stripedDataUriMessage = {
            username,
            sendDateIso,
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

  console.log('logMedia:', JSON.stringify(log));

  return next();

}

function logUser(req, res, next) {
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    let log = {
      date: new Date(new Date().getTime() - 1000*60*60*4),
      username: req.user.username,
      userAgent: res.locals.ua
    };

    console.log('logUser:', JSON.stringify(log));
  }

  return next();
}

app.use('/media', isAuthenticated, logMedia, express.static('media'))

// private messages.json
app.get('/messages.json', function(req, res){
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    sendMessagesJson(res);
  } else {
    sendNeedToLogin(res);
  }
});

app.get('/user', logUser, function(req, res){
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    let user = req.user;
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
