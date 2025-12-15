import jwt from "jsonwebtoken"

export const optionalJWT = (req, res, next) => {
    console.log("Okay hello??")
    const authHeader = req.headers.authorization;
    console.log("Auth header:",authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        req.user = null;
        return next();
    }
    
    const token = authHeader.split(" ")[1];
        if (!authHeader) {
        req.user = null;
        return next();
    }

    // 1. Guest token logic
    if (token.startsWith("guest_")) {
        req.user = {EmailID: token };
        return next();
    }

    // 2. Real JWT logic
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        req.user = null;
        return next();
    }
};
