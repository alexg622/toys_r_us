const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const users = require('./routes/api/users')
const toys = require('./routes/api/toys')
const db = require('./config/keys').mongoURI
const path = require('path')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect(db).then(() => console.log("mongoDB is connected")).catch(err => console.log(err))

app.use(passport.initialize())
require('./config/passport.js')(passport);

app.get('/test', (req, res) => res.send("working"))

app.use('/api/users', users)
app.use('/api/toys', toys)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
