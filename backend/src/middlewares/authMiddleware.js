const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try{
        // Read the Authorization header sent by the client
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return res.status(401).json({
                status: "error",
                message: "Authorization header missing"
            });
        }        
        // Check if the Authorization header starts with "Bearer "
        else if (!authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                status: "error",
                message: "Invalid header format"
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

        console.error(error);

        return res.status(401).json({
            status: "error",
            message: "Invalid or expired token"
        });
    }

};

module.exports = authMiddleware;