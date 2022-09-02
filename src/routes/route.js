const express = require("express")
const router = express.Router()

const { userCreate, userLogin, getUsers, getUsersById, updateUser, deleteUser } = require("../controllers/userController")

const { taskCreate, getTaskByQuery, getTaskById, updateTask, deleteTask } = require("../controllers/taskController")
const{sendEmail} = require("../email/account.js")
const {  } = require("../middleware/auth")


//...........................User's Api...................................

router.post('/user', userCreate)
router.post('/login', userLogin)
router.get('/user',getUsers)
router.get('/user/:userId/profile', getUsersById)
router.put('/user/:userId/profile', updateUser)
router.delete('/user/:userId/profile', deleteUser)
 
//.............................Task Api.....................................
router.post('/task', taskCreate)
router.get('/task', getTaskByQuery)
router.get('/task/:taskId', getTaskById)
router.put('/task/:taskId',updateTask)
router.delete('/task/:taskId', deleteTask)


router.get('/send',sendEmail)



module.exports = router