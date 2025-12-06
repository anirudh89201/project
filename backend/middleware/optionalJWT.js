import jwt from "jsonwebtoken"

export const optionalJWT = async(req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        req.user = null;
        return next();
    }
    const token = authHeader.split(" ")[1]
    try{
        const decode = jwt.decode(token,process.env.JWT_SECRET)
        req.user = decode
    }catch(errr){
        req.user = null;
    }
    next();
}