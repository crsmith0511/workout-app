const router = require('express').Router()
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../models/user')
const Workout = require('../models/workout')

const appKey = 'ff681939a77e4c3787f3a662bcdd53df';
const appSecret = '2ecfe64f44294b99a27ec10f12ccaa61';

router.use(passport.initialize())
router.use(passport.session())
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: appKey,
      clientSecret: appSecret,
      callbackURL: '/auth/spotify/callback'
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
        User.findOne({ userId: profile.id }).then(existingUser => {
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
    }
  )
);

const spotifyAuth = passport.authenticate('spotify',
  { scope: ['user-read-email', 'user-read-private']
})

router.get('/auth/spotify', spotifyAuth)

router.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res) {
      console.log(req.user.userId)
    res.redirect('http://localhost:3000/home');
    res.end()
})

//get current user's full profile
router.get('/current_user', (req, res) => {
  const userId = req.user.userId
  console.log(userId)
  User
  .find({userId: userId}).exec((error, user) => {
    if (error){
      res.writeHead(404);	
      return response.end("No user is signed in.");
    } else{
      return res.send(user)
    }
  })
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