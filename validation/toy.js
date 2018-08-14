const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateToyInput(data) {
  let errors = {}

  data.description = !isEmpty(data.description) ? data.description : ""
  data.price = !isEmpty(data.price) ? data.price : ""
  data.name = !isEmpty(data.name) ? data.name : ""

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Please fill in a description'
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Please fill in a price"
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Please fill in a name"
  }

  return {
    errors,
    isValid: isEmpty(errors) 
  }
}
