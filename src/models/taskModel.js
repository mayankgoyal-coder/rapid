const mongoose = require("mongoose")
const validator = require("validator")
const ObjectId = mongoose.Schema.Types.ObjectId

const taskSchema = new mongoose.Schema({


    owner: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    description: {
        type: String,
        required: true,
        trim: true
        // validate(value){
        //     if(!validator.isAlpha(value)){
        //         throw new Error("description is invalid")
        //     }
        // }
    },
    isCompleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model("Task", taskSchema)