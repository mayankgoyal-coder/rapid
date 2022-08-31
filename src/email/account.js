const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
    requireTLS : true,
    auth : {
        user : "mayankgoyal115@gmail.com",
        pass : ""
    }
});
const mailOptions = {
    from : "mayankgoyal115@gmail.com",
    to : "mayankgoyal115@gmail.com",
    subject : "hello world",
    text : "awesome"
}
transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error)
    }else{
        console.log("email has been sent", info.response)
    }
})