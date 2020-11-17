const { check } = require('express-validator');

const createErrorObject = errors => {
    const errorObject = [];
    errors.forEach(error => {
        let err = {
            [error.param]: error.msg
        };
        errorObject.push(err);
    });

    return errorObject;
};
const checkRegistrationFields = async (req, res, next) => {
    req.check('email').isEmail();
    req.check('username')
        .isString()
        .isLength({ min: 5, max: 15 })
        .withMessage('Username must be between 5 and 15 characters');
    req.check('password')
        .isString()
        .isLength({ min: 5, max: 15 })
        .withMessage('Password must be between 5 and 15 characters');

    let errors = req.validationErrors() || [];

    const user = await User.findOne({ username: req.body.username });

    if (user) {
        errors.push({ param: 'username', msg: 'Username already taken' });
    }

    if (errors.length > 0) {
        res.send({
            errors: createErrorObject(errors)
        });
    } else {
        next();
    }
};

module.exports = {
    checkRegistrationFields,
    createErrorObject
};