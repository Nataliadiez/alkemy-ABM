

const validateToken = async (req, res, next) => {
    try{
        const token = req.headers['x-access-token']
        if(!token) return res.status(403).json({msg: "No token"})
        req.userId = token
        next();

    } catch(error){
        res.status(401).json({msg: "No authorized", error})
    }
}

export default validateToken;