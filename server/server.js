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

const mainRoutes = require('./routes/main')

app.use(mainRoutes)

app.listen(8000, () => {
  console.log('Listening on port ' + 8000)
})