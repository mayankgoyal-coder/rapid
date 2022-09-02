const taskModel = require("../models/taskModel")
const userModel = require("../models/userModel")


//Here we requiring all the validation function from utils
const { isValid, isValidRequestBody, isValidObjectId } = require("../utils/validator")


const taskCreate = async (req, res) => {
    try {
        let requestBody = req.body
        let { description, owner } = requestBody

        if (!isValidRequestBody(requestBody))
            return res.status(400).send({ status: false, message: "Invalid parameters,please provide User Details" })

        if (!description)
            return res.status(400).send({ status: false, message: "Please Enter description" })
        if (!isValid(description))
            return res.status(400).send({ status: false, message: "description Should be valid ..." })


        if (!owner)
            return res.status(400).send({ status: false, message: "Please Enter owner" })
        if (!isValid(owner))
            return res.status(400).send({ status: false, message: "owner Should be valid ..." })
        if (!isValidObjectId(owner)) {
            return res.status(404).send({ status: false, msg: "Invalid UserId" });
        }

        

        const taskCreated = await taskModel.create(requestBody)
        return res.status(500).send({ status: true, message: "Task Created Successfully", data: taskCreated })
    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}
//##########################################################################################################################
const getTaskByQuery = async (req, res) => {
    try {
        const data = req.query
        const { description, owner } = data

        if (!isValidRequestBody(data))
        return res.status(400).send({ status: false, message: "Invalid parameters,please provide User Details" })

        if (!isValid(description))
            return res.status(400).send({ status: false, message: "description Should be valid ..." })
     
            // if (!isValid(owner))
        //     // return res.status(400).send({ status: false, message: "owner Should be valid ..." })
        // if (!isValidObjectId(owner)) {
        //     return res.status(404).send({ status: false, msg: "Invalid UserId" });
        // }
        // let getData = await taskModel.find()
        // .populate(user)
        // .then(p=>console.log(p))
        // .catch(error=>console.log(error));
        return res.status(200).send({ status: true, message: "Get Task", data: getData })
    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}

//###########################################################################################################################


const getTaskById = async function (req, res) {
    try {
        let taskId = req.params.taskId;

        if (!isValid(taskId)) {
            return res.status(400).send({ status: false, msg: "TaskId is required" });
        }
        if (!isValidObjectId(taskId)) {
            return res.status(404).send({ status: false, msg: "Invalid TaskId" });
        }

        let taskDetails = await taskModel.findById({ _id: taskId });
        if (!isValid(taskDetails)) {
            return res.status(400).send({ status: false, msg: "There is no task with this taskId" });
        } else {
            return res.status(200).send({ status: true, msg: "Congratulations", data: taskDetails });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, msg: error.message });
    }
};
//#####################################################################################################################
const updateTask = async function (req, res) {
    try {
        let data = req.body;
        let { description, isCompleted } = data;
        let taskId = req.params.taskId;

        let filter = {};

        if (!isValid(taskId)) {
            return res.status(400).send({ status: false, msg: "TaskId not found" });
        }
        if (!isValidObjectId(taskId)) {
            return res.status(404).send({ status: false, msg: "Invalid TaskId" });
        }

        if (!isValid(data)) {
            return res.status(400).send({ status: false, msg: "Please provide input via body" });
        }
        if (isValid(description)) {
            filter["description"] = description;
        }
        if (isValid(isCompleted)) {
            filter["isCompleted"] = isCompleted;
        }
        else {
            let updatedData = await taskModel.findOneAndUpdate({ _id: taskId}, { $set: filter }, { new: true });
            // console.log(updatedData)
            return res.status(200).send({ status: true, msg: "Successfully Updated!", data: updatedData });

        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};

// ##############################################################################################################################


const deleteTask = async function (req, res) {
    try {
        let data = req.body;
        let taskId = req.params.taskId;

        if (!isValid(taskId)) {
            return res.status(400).send({ status: false, msg: "taskId is required" });
        }
        if (!isValidObjectId(taskId)) {
            return res.status(400).send({ status: false, msg: "Invalid taskId" });
        }


        let deletedData = await taskModel.findOneAndDelete({ _id: taskId, }, { new: true });
        // console.log(deletedData)
        if (!isValid(deletedData)) {
            return res.status(404).send({ status: false, msg: "Task not found" });
        } else {
            return res.status(200).send({ status: true, msg: "Task deleted successfully" });
        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};

//################################################################################################################


module.exports = { taskCreate, getTaskByQuery, getTaskById, updateTask, deleteTask }