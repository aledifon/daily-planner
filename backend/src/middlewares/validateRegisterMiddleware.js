// importar express-validator
//         ↓
// definir reglas
//         ↓
// comprobar resultado de las reglas
//         ↓
// si error → response 400
// si correcto → next()
//         ↓
// exportar middleware(s)

const { body, validationResult } = require("express-validator");

const validateRegisterMiddleware = [

    // Name validation
    body("name")
        .isString()
        .withMessage("Name must be a string")

        .trim()

        .notEmpty()
        .withMessage("Name cannot be empty")

        .isLength({
            min: 2,
            max: 50
        })
        .withMessage("Name must be between 2 and 50 characters"),        

    // Email validation
    body("email")
        .isString()
        .withMessage("Email must be a string")
        
        .trim()

        .notEmpty()
        .withMessage("Email cannot be empty")

        .isEmail()
        .withMessage("Email must be a valid email address")

        .toLowerCase(),

    // Password validation
    body("password")
        .isString()
        .withMessage("Password must be a string")

        .notEmpty()
        .withMessage("Password cannot be empty")

        .isLength({
            min: 8,
            max: 50
        })
        .withMessage("Password must be between 8 and 50 characters"),

    // Check validation results
    (req, res, next) => {

        // Get validation errors
        const errors = validationResult(req);

        // If there are errors, return 400
        if(!errors.isEmpty()){

            const errorsArray = errors.array();

            return res.status(400).json({
                status: "error",
                message: errorsArray[0].msg
            });
        }

        // Otherwise continue
        next();
    }
    
];

module.exports = validateRegisterMiddleware;