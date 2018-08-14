const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateReviewInput(data) {
  let errors = {}

  data.review = !isEmpty(data.review) ? data.review : ""
  data.stars = !isEmpty(data.stars) ? data.stars : ""

  if (Validator.isEmpty(data.review)) {
    errors.review = "Please fill in review"
  }

  if (Validator.isEmpty(data.stars)) {
    errors.stars = "Please fill in Stars"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
