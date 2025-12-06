import jwt from "jsonwebtoken"

export const getToken = (EmailID) => {
    const token = jwt.sign(
        {EmailID},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN}
    )
    return token
}