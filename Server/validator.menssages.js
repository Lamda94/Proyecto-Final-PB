const {check, validationResult} = require('express-validator')

const validator = [
    check('id')
    .exists()
    .isNumeric(),
    check("author")
    .exists(),
    check('name')
    .exists()
    .not()
    .isEmpty(),
    check('lastname')
    .exists()
    .not()
    .isEmpty(),
    check('age')
    .exists()
    .isNumeric(),
    check('nickname')
    .exists()
    .not()
    .isEmpty(),
    check("avatar")
    .exists()
    .not()
    .isEmpty(),
    check('text')
    .exists()
    .not()
    .isEmpty(),
    (req, res, next)=>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(403).json({ errors: error.array() })
        }
    }
]

module.exports = {validator}
