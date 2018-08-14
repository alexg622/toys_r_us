const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// Load input validation
const validationRegisterInput = require("../../validation/register")
const validationLoginInput = require('../../validation/login')

// Load user model
// const User = require('../../models/User')

router.get('/test', (req, res) => res.json({msg: 'Users Works'}))

module.exports = router
