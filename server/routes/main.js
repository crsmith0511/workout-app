const router = require('express').Router()
const Workout = require('../models/workout')
const bodyParser   = require('body-parser');
const url = require("url");
const querystring = require('querystring');


router.use(bodyParser.json());


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