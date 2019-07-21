const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  const errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  const dataUsername = !isEmpty(data.username) ? data.username : '';
  const dataPassword = !isEmpty(data.password) ? data.password : '';

  // Email checks
  if (Validator.isEmpty(dataUsername)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(dataUsername)) {
    errors.email = 'Email is invalid';
  }

  // Password checks
  if (Validator.isEmpty(dataPassword)) {
    errors.password = 'Password field is required';
  }
  if (
    !Validator.isLength(data.password, {
      min: 6,
      max: 30
    })
  ) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
