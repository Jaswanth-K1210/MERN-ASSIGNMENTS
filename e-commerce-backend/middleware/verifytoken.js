import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

export function verifytoken(req, res, next) {
    // token verification middleware
    let signedtoken = req.cookies.token;
    console.log("Token from cookies:", signedtoken);
    if (!signedtoken) {
        return res.status(401).json({ message: "No token provided" });
    }

    // verify token
    let decodedtoken = jwt.verify(signedtoken, 'secretkey')
    console.log("Decoded Token:", decodedtoken);
    next();
}