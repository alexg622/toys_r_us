const express = require("express")
const router = express.Router()
const passport = require('passport')
const Toy = require('../../models/Toy')
const User = require('../../models/User')
const validateToyInput = require('../../validation/toy')
const validateReviewInput = require('../../validation/review')
// test
router.get('/test', (req, res) => res.json({msg: "toys working"}))

// get toys
router.get('/', (req, res) => {
  Toy.find()
    .then(toys => res.json(toys))
    .catch(err => res.status.json({ notoysfound: "No toys found"}))
})

// get toy
router.get('/:toyId', (req, res) => {
  Toy.findById(req.params.toyId)
    .then(toy => res.json(toy))
    .catch(err =>
      res.status(404).json({ notoyfound: "No toy found with that ID"})
    )
})

// create toy
router.post('/', (req, res) => {
  const { errors, isValid } = validateToyInput(req.body)

  if(!isValid) {
    return res.status(400).json(errors)
  }

  const newToy = new Toy({
    description: req.body.description,
    name: req.body.name,
    price: req.body.price,
    avatar: req.body.avatar
  })
  newToy.save().then(toy => res.json(toy))
})

// update toy
router.patch('/:toyId', (req, res) => {
  Toy.update({_id: req.params.toyId}, {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  }).then(toy => res.json(toy))
})

// delete toy
// change later to give user who made toy
router.delete('/:toyId', (req, res) => {
  Toy.findById(req.params.ToyId).then(toy => {
    toy.remove().then(toy => res.json(toy))
  })
})

// create review
router.post('/:toyId/reviews',
passport.authenticate('jwt', { session: false }),
(req, res) => {
  const {errors, isValid} = validateReviewInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Toy.findById(req.params.toyId)
    .then(toy => {
      const newReview = {
        review: req.body.review,
        stars: req.body.stars,
        user: req.user.id
      }

      toy.reviews.unshift(newReview)
      toy.save().then(toy => res.json(toy))
    })
    .catch(err => res.status(404).json({ toynotfound: "No toy with that ID found"}))
})

// add toy to users cart
router.post('/:toyId/cart',
passport.authenticate('jwt', { session: false }),
(req, res) => {
  User.findById(req.user.id).then(user => {
    Toy.findById(req.params.toyId).then(toy => {
      user.cart.unshift(toy)
      user.save()
      res.json(user)
    })
  })
})

// change quantity in cart
router.patch('/:toyId/cart',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      user.cart.map(toy => {
        if(toy.id === req.params.toyId) toy.quantity = req.body.quantity
      })
      user.save()
      res.json(user)
    })
  })

// remove toy from cart
router.delete('/:toyId/cart',
passport.authenticate('jwt', { session: false }),
(req, res) => {
  User.findById(req.user.id).then(user => {
    let index
    user.cart.map((toy, idx) => {
        if (toy.id === req.params.toyId) {
          index = idx
          user.cart.splice(index, 1)
          user.save()
          res.json(user)
        }
    })
  })
})

// purchase toy
router.post('/purchase',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
        if(user.toys.length === 0) {
          user.toys = user.cart
          user.cart = []
          user.save()
          return res.json(user)
        }
        user.cart.map(toy => {
          user.toys.map(userToy => {
            if(userToy.id === toy.id) {
              userToy.quantity = String(parseInt(toy.quantity) + parseInt(userToy.quantity))
            } else {
              user.toys.unshift(toy)
            }
          })
        })
      user.cart = []
      user.save()
      res.json(user)
    })
  }
)

module.exports = router
