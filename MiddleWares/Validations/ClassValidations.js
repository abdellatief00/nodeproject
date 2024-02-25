const {body , param , query} = require('express-validator');
const mongoose = require('mongoose');


exports.insertValidations = [
    body("fullname").isString().withMessage("Name Should Be String").isAlpha("en-US", { ignore: ' ' }).withMessage("Name Should Be Written In English With No Numbers or Special Characters")
    .isLength({min:3}).withMessage("Name Should Be at least 3 letters long"),
    body('supervisor').optional()
    .custom((value, { req }) => {
        // Check if the value is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Supervisor must be a valid ObjectId');
        }
        return true; // Indicates that the validation passed
    })

]

exports.updateValidations = [
    body('_id').isString().withMessage("Id should be a string").isLength({min:4}).withMessage("id should be one letter long at least"),
    body("fullname").optional().isString().withMessage("Name Should Be String").isAlpha("en-US", { ignore: ' ' }).withMessage("Name Should Be Written In English With No Numbers or Special Characters")
    .isLength({min:3}).withMessage("Name Should Be at least 3 letters long"),
    body('supervisor').optional()
    .custom((value, { req }) => {
        // Check if the value is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Supervisor must be a valid ObjectId');
        }
        return true; // Indicates that the validation passed
    })
]

exports.deletevalidations = [
    body('_id').isString().withMessage("Id should be a string").isLength({min:4}).withMessage("id should be four letter long at least"),
]
