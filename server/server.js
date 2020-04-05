const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

mongoose.connect('mongodb://localhost/workouts', {useNewUrlParser: true})

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const mainRouter = require('./routes/takeTwo')

app.use(mainRouter)

app.listen(5000, () => {
  console.log('Listening on port ' + 5000)
})