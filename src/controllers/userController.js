const mongoose = require("mongoose")
const multer = require("multer")
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Here we requiring all the validation function from utils
const { isValid, isValidRequestBody,isValidObjectId } = require("../utils/validator")
const saltRounds = 10


const userCreate = async (req, res) => {
    try {
        let requestBody = req.body
        let { name, age,  email, password,profileImage } = requestBody

        if (!isValidRequestBody(requestBody))
            return res.status(400).send({ status: false, message: "Invalid parameters,please provide User Details" })

        if (!name)
            return res.status(400).send({ status: false, message: "Please Enter Name" })
        if (!isValid(name))
            return res.status(400).send({ status: false, message: "Name Should be valid ..." })
        

        if (!(age))
            return res.status(400).send({ status: false, message: "Please enter age" })
         age = String(age)
        
        if (!isValid(age))
            return res.status(400).send({ status: false, message: "Age Should be valid ..." })
        age = Number(age)
  

        if (!email)
            return res.status(400).send({ status: false, message: "Email Id is Required ...." })
        if (!isValid(email))
            return res.status(400).send({ status: false, message: "Email should be valid" })
               if (await userModel.findOne({ email: email }))
            return res.status(400).send({ status: false, message: `Please enter unique Email Id....` })
            //  console.log(email)

        if (!password)
            return res.status(400).send({ status: false, message: " Password is Required ...." })
        if (!(password.length >= 8 || password.length <= 15))
            return res.status(400).send({ status: false, message: " Password Length Should be Between 8 and 15 ..." })
        requestBody.password = await bcrypt.hash(password, saltRounds);
        // console.log(requestBody.password)

        
    

    

        const userCreated = await userModel.create(requestBody)
        return res.status(200).send({ status: true, message: "User Created Successfully ", data: userCreated })
         
    } catch (err) {
        console.log(err)
       return res.status(500).send({ Error: err.message })
    }
}
//#########################################################################################################################
const userLogin = async function (req, res) {
    try {
        const requestBody = req.body
        const { email, password } = requestBody
        if (!isValidRequestBody(requestBody))
            return res.status(400).send({ status: false, messsage: "Invalid request parmeters,please provide login details" })


        if (!email)
            return res.status(400).send({ status: false, message: "Email Id is Required ...." })
        if (!password)
            return res.status(400).send({ status: false, message: " Password is Required ...." })
            
            const userLogin = await userModel.findOne({ email: email })
            if (!userLogin) return res.status(400).send({ status: false, message: "Invalid Login Credentials" })

        let decrypt = await bcrypt.compare(password, userLogin.password)
        if (!decrypt)
            return res.status(400).send({ status: false, message: "password is wrong" })

         const token = await jwt.sign({ userId: userLogin._id }, "TaskApp(@#@42)", { expiresIn: "1d" })
        return res.status(200).send({ status: true, message: "Login Successfully", data: token })

    }
    catch (err) {
       return res.status(500).send({ status: false, Error: err })
    }
}
//##########################################################################################################################


const getUsers =async(req,res)=>{
try{
    let data = req.query
    const{name,age,email} = data
    if (!isValidRequestBody(data))
    return res.status(400).send({ status: false, message: "Invalid parameters,please provide User Details" })

    if (!isValid(name))
    return res.status(400).send({ status: false, message: "Name Should be valid ..." })
    
    age = String(age)    
    if (!isValid(age))
        return res.status(400).send({ status: false, message: "Age Should be valid ..." })
    age = Number(age)
    if (!isValid(email))
    return res.status(400).send({ status: false, message: "Email should be valid" })

    let result = await userModel.find(data)
    return res.status(200).send({status:true ,message : "User List", data : result})

} catch (err) {
    return res.status(500).send({ status: false, Error: err.messsage })
 }
}
//############################################################################################################################

const getUsersById = async(req,res)=>{
    try{
        let userId= req.params.userId
        if (!isValid(userId)) {
            res.status(400).send({ status: false, msg: "UserId is required" });
            return
        }
        if (!isValidObjectId(userId)) {
            res.status(404).send({ status: false, msg: "Invalid UserId" });
            return
        }
        let findUserId =await userModel.findById({_id:userId})
        return res.status(200).send({status:true, message:"User Details",data:findUserId})
    }catch(err){
        return res.status(500).send({status:false,Error:err.message})
    }
}
//#####################################################################################################################
const updateUser = async(req,res)=>{
    try{
        let userId = req.params.userId
        let data = req.body
        const { name,age,email,password}= data

        //authorization
        if(req.decodedUserId != userId)
        return res.status(401).send({status:false,message:"you are not authorized"})

        const UserToBeUpdated = await userModel.findOne({_id:userId})
        if(!UserToBeUpdated)
        return res.status(400).send({status:false,message:"User not exists"})


        let updatedUser = await userModel.findByIdAndUpdate({_id:userId},{name:name,age:age,email:email,password:password},{upsert:true})
        return res.status(200).send({status:true,message:"User Updated Successfully",data:updatedUser})

    }catch(err){
        return res.status(500).send({status:false,Error:err.message})
    }
}
//############################################################################################################################

const deleteUser = async(req,res)=>{
    try{
           const data = req.body
           const userId = req.params.userId

           //authorization
        if(req.decodedUserId != userId)
        return res.status(401).send({status:false,message:"you are not authorized"})
       
           const deletedUser = await userModel.findOneAndDelete({_id:userId},{new:true})
           return res.status(500).send({status:true,message:"User deleted successfully",data: deletedUser})

    }catch(err){
        return res.status(500).send({status:false,Error:err.message})
    }
}

//################################################################################################################################


module.exports = { userCreate, userLogin ,getUsers,getUsersById,updateUser,deleteUser}