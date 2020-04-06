const express = require('express')
const  session = require('express-session')
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../models/user')
const Workout = require('../models/workout')

// var consolidate = require('consolidate');

var appKey = 'ff681939a77e4c3787f3a662bcdd53df';
var appSecret = '26ec7fa9722d4ea993f1711f5ad7738f';

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, expires_in
//   and spotify profile), and invoke a callback with a user object.
passport.use(
  new SpotifyStrategy(
    {
      clientID: appKey,
      clientSecret: appSecret,
      callbackURL: 'http://localhost:5000/callback'
    },
    // function(accessToken, refreshToken, expires_in, profile, done) {
    //   // asynchronous verification, for effect...
    //   process.nextTick(function() {
    //     // To keep the example simple, the user's spotify profile is returned to
    //     // represent the logged-in user. In a typical application, you would want
    //     // to associate the spotify account with a user record in your database,
    //     // and return that user instead.
    //     return done(null, profile);
    //   });
    // }
    (accessToken, refreshToken, expires_in, profile, done) => {
        console.log(profile)
        const query = {userId: profile.id}
        User.findOneAndUpdate(query, {$set: {accessToken: accessToken}}).then(existingUser => {
        // User.findOne({ userId: profile.id }).then(existingUser => {
            if (existingUser) {
              // we already have a record with the given profile ID
              done(null, existingUser)
            } else {
              // we don't have a user record with this ID, make a new record!
              new User({
                name: profile.displayName,
                email: profile.email,
                userId: profile.id,
                img: profile.images,
                userURI: profile.uri,
                accessToken: accessToken,
                refreshToken: refreshToken,
                tokenExpirationTime: expires_in
              })
                .save()
                .then(user => done(null, user))
            }
          })
        })
);

var router = express();


router.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
router.use(passport.initialize());
router.use(passport.session());


router.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-read-currently-playing', 'user-read-recently-played', 'user-read-playback-state', 'streaming', 'app-remote-control'],
    showDialog: true
  }),
  function(req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  }
);

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('http://localhost:3000/home');
  }
);

// get current user's full profile
router.get('/auth/spotify/current_user', (req, res) => {
  const profileId = "1246187641"
  // console.log('current user', req.user)
  User
  .find({userId: profileId}).exec((error, user) => {
    if (error){
      res.writeHead(404);	
      return response.end("No user is signed in.");
    } else{
      return res.send(user)
    }
  })
  // console.log(req.user)
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('http://localhost:3000');
    res.end()
})

router.get('/make-workout', (req, res, next) => {
  
  // let workout = new Workout()

  // workout.save((err) => {
  //   if (err) throw err
  // })

res.end()
})

router.get('/workout', (req, res, next) =>{
const workoutCategory = req.query.category
const workoutType = req.query.type
const workoutNumber = parseInt(req.query.number)

Workout.find({category: workoutCategory, type: workoutType, number: workoutNumber})
.exec((error, shortWorkout) => {
  if(error){
    res.next(err)
  }
  const count = shortWorkout.length
  if (count == 0){
    res.writeHead(404);	
    return res.end(`Cannot find workout type: ${workoutType} or workout number: ${workoutNumber}`);
  }
  return res.send(shortWorkout)
})
})
module.exports = router
