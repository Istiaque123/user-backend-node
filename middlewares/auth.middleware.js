const jwt = require("jsonwebtoken");
require("dotenv").config();


async function authMiddleware(req, res, next) {
    try {

        // const contentType = req.headers["accept"];

        // if (!contentType.includes("application/json")) {
        //     return res.status(400).json({
        //     error: true,
        //     message: "Accept must be 'application/json'",
        // });
        // }

        // console.log( !contentType.includes("application/json"));
        
        
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(404).json({
                error: true,
                message: "Access denied. No token provided"
            });
        }

        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRATE);

        if (!decode) {
            return res.status(404).json({
                error: true,
                message: "Access denied. No token provided"
            });
        }

        req.user = decode;

        let userId = req.user.token;
        // work for role future 

        next();


    } catch (error) {
        console.error("eror:", error);
    res.status(401).json({ error: true, message: 'Invalid or expired token.' });
    }
}

module.exports = authMiddleware;