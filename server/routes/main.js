const router = require('express').Router()
const Workout = require('../models/workout')
const bodyParser   = require('body-parser');
const url = require("url");
const querystring = require('querystring');


router.use(bodyParser.json());


router.get('/make-workout', (req, res, next) => {
  
    let workout = new Workout()

    // workout.number = 1,
    // workout.category = "Short",
    // workout.type = "Body-Weight",
    // workout.time = 720,
    // workout.rounds = 4,
    // workout.description = "Four rounds of working for :30, resting for :30. All movements plus rest equals 1 round."
    // workout.movements = [{
    //   movement: "Air Squats",
    //   time: 30,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=rMvwVtlqjTE&list=PLdWvFCOAvyr0q99QIkLBq4tfYhTVbsBIs",
    //   rest: 30
    // },
    // {
    //   movement: "Push-Ups",
    //   time: 30,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=0pkjOk0EiAk&list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4&index=11",
    //   rest: 30
    // },
    // {
    //   movement: "Jump-Rope",
    //   time: 30,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=h3mh7B4YHI4&list=PLtzeqj0zQWd_QHAZbdKYqhYW4O3t16abN&index=31",
    //   description: "Don't have a jump rope? Substitution: hop in place.",
    //   rest: 30
    // }]

    // workout.number = 2,
    // workout.category = "Short",
    // workout.type = "Body-Weight",
    // workout.time = 720,
    // workout.rounds = 4,
    // workout.description = "Four rounds of working for :45, resting for :15. All movements plus rest equals 1 round."
    // workout.movements = [{
    //   movement: "Burpee",
    //   time: 45,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=auBLPXO8Fww&list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4&index=36",
    //   rest: 15
    // },
    // {
    //   movement: "Sit-Ups",
    //   time: 45,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=VIZX2Ru9qU8&list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4&index=37",
    //   rest:15
    // },
    // {
    //   movement: "Box-Jumps",
    //   time: 45,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=NBY9-kTuHEk&list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4&index=44",
    //   description: "Don't have something you can jump on? Substitution: jump as high as you can in place.",
    //   rest: 15
    // }]

    // workout.number = 3,
    // workout.category = "Short",
    // workout.type = "Body-Weight",
    // workout.time = 60,
    // workout.rounds = 4,
    // workout.description = "Four rounds of working for 1:00. There is not transition time between movements. Rest :30 after you complete both movements. All movements plus rest equals 1 round."
    // workout.movements = [{
    //   movement: "Walking Lunges",
    //   time: 60,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=auBLPXO8Fww&list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4&index=36",
    //   description: "Can do walking lunges or lunges in place.",
    //   rest: 0
    // },
    // {
    //   movement: "Mountain Climbers",
    //   time: 60,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=bw4lYQ3P-xI&list=PLtzeqj0zQWd_QHAZbdKYqhYW4O3t16abN&index=50",
    //   rest: 30
    // }]

    // workout.number = 1,
    // workout.category = "Short",
    // workout.type = "BarBell",
    // workout.time = 720,
    // workout.rounds = 4,
    // workout.description = "Four rounds of working for :30, resting for :30. All movements plus rest equals 1 round. Choose a weight you can stay moving at."
    // workout.movements = [{
    //   movement: "BarBell Front Squats",
    //   time: 30,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=uYumuL_G_V0&list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4&index=9",
    //   rest: 30
    // },
    // {
    //   movement: "Push-Press",
    //   time: 30,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=iaBVSJm78ko&list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4&index=14",
    //   rest: 30
    // },
    // {
    //   movement: "Jump-Rope",
    //   time: 30,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=h3mh7B4YHI4&list=PLtzeqj0zQWd_QHAZbdKYqhYW4O3t16abN&index=31",
    //   description: "Don't have a jump rope? Substitution: hop in place.",
    //   rest: 30
    // }]


    // workout.number = 2,
    // workout.category = "Short",
    // workout.type = "BarBell",
    // workout.time = 720,
    // workout.rounds = 4,
    // workout.description = "Four rounds of working for :45, resting for :15. All movements plus rest equals 1 round."
    // workout.movements = [{
    //   movement: "Burpee",
    //   time: 45,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=auBLPXO8Fww&list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4&index=36",
    //   rest: 15
    // },
    // {
    //   movement: "BarBell Deadlifts",
    //   time: 45,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=1ZXobu7JvvE&list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4&index=1",
    //   rest: 15
    // },
    // {
    //   movement: "Box-Jumps",
    //   time: 45,
    //   reps: 0,
    //   video: "https://www.youtube.com/watch?v=NBY9-kTuHEk&list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4&index=44",
    //   description: "Don't have something you can jump on? Substitution: jump as high as you can in place.",
    //   rest: 15
    // }]

    workout.number = 3,
    workout.category = "Short",
    workout.type = "BarBell",
    workout.time = 60,
    workout.rounds = 4,
    workout.description = "Four rounds of working for 1:00. There is not transition time between movements. Rest :30 after you complete both movements. All movements plus rest equals 1 round."
    workout.movements = [{
      movement: "Barbell Thrusters",
      time: 60,
      reps: 0,
      video: "https://www.youtube.com/watch?v=L219ltL15zk&list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4&index=18",
      rest: 0
    },
    {
      movement: "BarBell Sumo Deadlift High Pulls",
      time: 60,
      reps: 0,
      video: "https://www.youtube.com/watch?v=gh55vVlwlQg&list=PLdWvFCOAvyr3EWQhtfcEMd3DVM5sJdPL4&index=10",
      rest: 30
    }]

    workout.save((err) => {
      if (err) throw err
    })
  
  res.end()
})


router.get('/workout', (req, res, next) =>{
  const workoutCategory = req.query.category
  const workoutType = req.query.type
  const workoutNumber = parseInt(req.query.number)

  Workout.find({category:workoutCategory, type: workoutType, number: workoutNumber})
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