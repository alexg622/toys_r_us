const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const users = require('./routes/api/users')
const toys = require('./routes/api/toys')
const db = require('./.git/keys').mongoURI
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect(db).then(() => console.log("mongoDB is connected")).catch(err => console.log(err))

app.use(passport.initialize())
require('./.git/passport.js')(passport);

app.get('/test', (req, res) => res.send("working"))

app.use('/api/users', users)
app.use('/api/toys', toys)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
