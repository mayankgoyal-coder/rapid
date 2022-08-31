const express = require("express")
const router = express.Router()

const { userCreate, userLogin, getUsers, getUsersById, updateUser, deleteUser } = require("../controllers/userController")

const { taskCreate, getTaskByQuery, getTaskById, updateTask, deleteTask } = require("../controllers/taskController")
const { authentication } = require("../middleware/auth")


//...........................User's Api...................................

router.post('/user', userCreate)
router.post('/login', userLogin)
router.get('/user',authentication,getUsers)
router.get('/user/:userId/profile',authentication, getUsersById)
router.put('/user/:userId/profile',authentication, updateUser)
router.delete('/user/:userId/profile',authentication, deleteUser)
 
//.............................Task Api.....................................
router.post('/task', taskCreate)
router.get('/task',authentication, getTaskByQuery)
router.get('/task/:taskId',authentication, getTaskById)
router.put('/task/:taskId', authentication,updateTask)
router.delete('/task/:taskId',authentication, deleteTask)



module.exports = router