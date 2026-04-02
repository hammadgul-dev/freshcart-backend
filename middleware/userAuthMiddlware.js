import jwt from "jsonwebtoken"

export function userAuthMiddleware(req , resp , next){
    try{
        let userToken = req.cookies.token
        if(!userToken)
            return resp.status(401).json({message : "SignUp Required"})
        let verifyToken = jwt.verify(userToken , process.env.JWT_SECRET)
        if(!verifyToken.userId)
            return resp.status(400).json({message : "SignUp Required"})
        req.user = verifyToken
        next()
    }
    catch(e){
        return resp.status(401).json({ message: "Session expired, login again" })
    }
}
