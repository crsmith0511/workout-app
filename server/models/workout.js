const mongoose = require('mongoose')
const Schema = mongoose.Schema


const WorkoutSchema = new Schema({
  number: Number,
  category: String,
  type: String,
  time: Number,
  rounds: Number,
  description: String,
  movements: [{
    movement: String,
    time: Number,
    reps: String,
    video: String,
    description: String,
  }]
})

module.exports = mongoose.model('workout', WorkoutSchema)