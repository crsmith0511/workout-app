// const express = require('express')
// const router = require('express').Router()
// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy
// const mongoose = require('mongoose')
// const bodyParser   = require('body-parser');
// const cookieSession = require('cookie-session')
// const Workout = require('../models/workout')
// const User = require('../models/user')

// router.use(bodyParser.json());


// router.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: ['helloworld']
//   })
// )

// router.use(passport.initialize())
// router.use(passport.session())

// passport.serializeUser((user, done) => {
//   done(null, user._id)
// })

// passport.deserializeUser((id, done) => {
//   console.log(id)
//   done(null, id)
// })

// passport.use(
//   new GoogleStrategy({
//       clientID: '1014221627378-pfi94mdtrqs0buro6uh55a372ambjre8.apps.googleusercontent.com',
//       clientSecret: 'AjY_3SruIzcuGRv99XSKQ4Mj',
//       callbackURL: '/auth/google/callback'
//     },
//     (accessToken, refreshToken, profile, done) => {
//       User.findOne({ googleId: profile.id }).then(existingUser => {
//         if (existingUser) {
//           // we already have a record with the given profile ID
//           done(null, existingUser)
//         } else {
//           // we don't have a user record with this ID, make a new record!
//           new User({
//             googleId: profile.id,
//             name: profile.displayName,
//             email: profile.emails[0].value
//           })
//             .save()
//             .then(user => done(null, user))
//         }
//       })
//     }
//   )
// )

// const googleAuth = passport.authenticate('google',
//   { scope: ['profile', 'email']
// })

// router.get('/auth/google', googleAuth)

// router.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   function(req, res) {
//     res.redirect('http://localhost:3000/home');
//     res.end()
// })

// router.get('/api/current_user', (req, res) => {
//   console.log(req.user)
//   res.send(req.user)
// });

// const ensureAuthenticated = (req, res, next) => {
//   if (!req.user) {
//     res.redirect('/')
//   } else {
//     next();
//   }
// };


// router.get('/api/logout', (req, res) => {
//   req.logout();
//   req.session = null;
//   res.redirect('http://localhost:3000');
//   res.end()
// })

// //get current user's full profile
// router.get('/current_user', ensureAuthenticated, (req, res) => {
//   const id = req.user
//   User
//   .findById(id).exec((error, user) => {
//     if (error){
//       res.writeHead(404);	
//       return response.end("No user is signed in.");
//     } else{
//       return res.send(user)
//     }
//   })
// });


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