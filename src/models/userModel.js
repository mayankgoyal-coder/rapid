const mongoose = require("mongoose")
const taskModel = require("./taskModel")
const validator = require("validator")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error("Name is invalid")
            }
        }
    },
    age: {
        type: String,
        default:0,
        validate(value){
            if(!validator.isNumeric(value)){
                throw new Error("Age is invalid")
            }
        }
    },
   
    email:
    {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password:
    {
        type: String,
        required: true,
        trim : true
        
    },
    profileImage:{
        type:String
    }

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)