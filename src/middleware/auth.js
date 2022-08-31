const jwt = require("jsonwebtoken")
const userController = require("../controllers/userController")


const authentication = async (req, res, next) => {
    try {
        const token = req.headers["x-api-key"]
        // console.log(token)
        if (!token)
            return res.status(403).send({ status: false,msg:"not Authenticated"} )
        const decodedToken = await jwt.verify(token, "TaskApp(@#@42)")
        console.log(decodedToken)
        if (!decodedToken)
            return res.status(400).send({ status: false, msg: "Token is invalid" });
        req["decodedUserId"] = decodedToken.userId
        next()


    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, err: err.message })
    }
}


module.exports = { authentication }