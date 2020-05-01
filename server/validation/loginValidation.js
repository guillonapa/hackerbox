const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
    const errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    const dataUsername = !isEmpty(data.username) ? data.username : '';
    const dataPassword = !isEmpty(data.password) ? data.password : '';

    // Email checks
    if (Validator.isEmpty(dataUsername)) {
        errors.username = 'Email field is required';
    } else if (!Validator.isEmail(dataUsername)) {
        errors.username = 'Email is invalid';
    }

    // Password checks
    if (Validator.isEmpty(dataPassword)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
