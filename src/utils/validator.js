const mongoose = require("mongoose")

// Function to validate all the data that is coming from req.body req.query
const isValid =(value)=>{
    if(typeof value === "undefined" || typeof value === null) return false
    if(typeof value === "string" && value.trim().length===0) return false
    return true
}
//Function to check that something is coming from request body or not by checking the length of array which contain keys of req.body,req,query
const isValidRequestBody = (requestBody)=>{
    return Object.keys(requestBody).length !=0
}

//Function to validate all the Ids that is coming from req.body,req.params,req.query
const isValidObjectId = (ObjectId)=>{
    return mongoose.Types.ObjectId.isValid(ObjectId)
}
module.exports={isValid,isValidRequestBody,isValidObjectId}