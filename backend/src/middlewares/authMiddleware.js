const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try{
        // Read the Authorization header sent by the client
        const authHeader = req.headers.authorization;

        // Read the Authorization header sent by the client
        if(!authHeader){
            return res.status(401).json({
                status: "error",
                message: "Authorization header missing"
            });
        }

        // Extract the token from: "Bearer <token>"
        const token = authHeader.split(" ")[1];

        // Verify that the token was signed by this backend and is still valid
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store the authenticated user data in the request
        req.user = decoded;

        // Continue to the next middleware or controller
        next();
    }
    catch(error){
        return res.status(401).json({
            status: "error",
            message: "Invalid or expired token",
            error: error.message
        });
    }

};

module.exports = authMiddleware;