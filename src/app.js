const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
require("dotenv").config()
const port = process.env.PORT || 3000
const route = require("./routes/route")
const app = express()

mongoose.connect('mongodb+srv://mongoabhishek:JGETcKMFq8k1RFrV@cluster0.nn6fz.mongodb.net/project-taskapp?retryWrites=true&w=majority',{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDb is Connected"))
.catch(err=>console.log(err))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use("/",route)

app.listen(port,()=>{
    console.log(`Server is running on the port ${(process.env.port || 8000)}`)
})