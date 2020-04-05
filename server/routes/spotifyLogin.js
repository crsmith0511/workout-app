// const router = require('express').Router();
// const passport = require('passport');
// const SpotifyStrategy = require('passport-spotify').Strategy;
// const cookieSession = require('cookie-session');
// const querystring = require('querystring');
// const User = require('../models/user')
// const Workout = require('../models/workout')

// const appKey = 'ff681939a77e4c3787f3a662bcdd53df';
// const appSecret = '26ec7fa9722d4ea993f1711f5ad7738f';
// router.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: ['helloworld']
//   })
// )

// router.use(passport.initialize())
// router.use(passport.session())
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// passport.use(
//   new SpotifyStrategy(
//     {
//       clientID: appKey,
//       clientSecret: appSecret,
//       callbackURL: '/callback'
//     },
//     (accessToken, refreshToken, expires_in, profile, done) => {
//       const query = {userId: profile.id}
//         User.findOneAndUpdate(query, {$set: {accessToken: accessToken}}).then(existingUser => {
//             if (existingUser) {
//               // we already have a record with the given profile ID
//               done(null, existingUser)
//             } else {
//               // we don't have a user record with this ID, make a new record!
//               new User({
//                 name: profile.displayName,
//                 email: profile.email,
//                 userId: profile.id,
//                 img: profile.images[0].url,
//                 userURI: profile.uri,
//                 accessToken: accessToken,
//                 refreshToken: refreshToken,
//                 tokenExpirationTime: expires_in
//               })
//                 .save()
//                 .then(user => done(null, user))
//             }
//           })
//     }
//   )
// );

// const spotifyAuth = passport.authenticate('spotify',
//   { scope: ['user-read-email', 'user-read-private', 'user-read-currently-playing', 'user-read-playback-state'],
//   showDialog: true
// })

// router.get('/auth/spotify', spotifyAuth)

// router.get(
//   '/auth/spotify',
//   passport.authenticate('spotify', {
//     scope: ['user-read-email'],
//     showDialog: true
//   }),
//   function(req, res) {
//     // The request will be redirected to spotify for authentication, so this
//     // function will not be called.
//   }
// );

// router.get('/callback',
//   passport.authenticate('spotify', { failureRedirect: '/' }),
//   function(req, res) {
//       console.log(req.user.userId)
//     // res.redirect('http://localhost:3000/home');
//     // res.end()
// })

// // router.get('/auth/spotify',
// //   passport.authenticate('spotify', {
// //     scope: ['user-read-email', 'user-read-private', 'user-read-currently-playing', 'user-read-playback-state'],
// //     showDialog: true
// //   }))


// // router.get('/auth/spotify', passport.authenticate('spotify'), function(req, res) {

// // })

// // router.get('/auth/spotify/callback',
// //   passport.authenticate('spotify', { failureRedirect: '/' }),
// //   function(req, res) {
// //     console.log(req.user.userId)
// //     res.redirect('http://localhost:3000/home');
// //     res.end()
// // })

// //get current user's full profile
// router.get('/auth/spotify/current_user', (req, res) => {
//   const profileId = "1246187641"
//   // console.log('current user', req.user)
//   User
//   .find({userId: profileId}).exec((error, user) => {
//     if (error){
//       res.writeHead(404);	
//       return response.end("No user is signed in.");
//     } else{
//       return res.send(user)
//     }
//   })
//   // console.log(req.user)
// });

// router.get('/logout', (req, res) => {
//     req.logout();
//     req.session = null;
//     res.redirect('http://localhost:3000');
//     res.end()
// })

// router.get('/make-workout', (req, res, next) => {
  
//   // let workout = new Workout()

//   // workout.save((err) => {
//   //   if (err) throw err
//   // })

// res.end()
// })

// router.get('/workout', (req, res, next) =>{
// const workoutCategory = req.query.category
// const workoutType = req.query.type
// const workoutNumber = parseInt(req.query.number)

// Workout.find({category: workoutCategory, type: workoutType, number: workoutNumber})
// .exec((error, shortWorkout) => {
//   if(error){
//     res.next(err)
//   }
//   const count = shortWorkout.length
//   if (count == 0){
//     res.writeHead(404);	
//     return res.end(`Cannot find workout type: ${workoutType} or workout number: ${workoutNumber}`);
//   }
//   return res.send(shortWorkout)
// })
// })

// module.exports = router