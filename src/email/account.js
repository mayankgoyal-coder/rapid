const nodemailer = require("nodemailer")


const sendEmail = async (email,name,req,res) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        hosts: 'smpt.gmail.com',
        auth: {
          user: 'mayankgoyal115@gmail.com',
          pass: 'dfpqyaickfcdfivz'
        }
      });
  
      await transporter.sendMail({
        from: 'mayankgoyal115@gmail.com',
        to: email,
        subject: "subject",
        html: `<body style="padding: 50px;">

        <div style="padding: 20px; border-radius: 10px; border: 1px solid gray;">
        <h1 style="text-align: center">${name}Welcome</h1>
                   
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNmCvNTyyVkSryj0kgAzAsN4SIt7KzRRgdKO33KyUmKw&s"
                            style="display: block;
                                    margin-left: auto;
                                    margin-right: auto;
                                    width: 50%; width: 50px;">
                    </div>
               
        </body>`
      });
      console.log("email sent sucessfully");
      res.send({msg:"email is send"})
    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };


module.exports = {sendEmail}