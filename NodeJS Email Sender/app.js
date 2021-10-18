const express = require("express");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
    app.post("/", function(req,res){
        const email = req.body.to;
        const subject = req.body.subject;
        const message = req.body.message;

        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'yourMail@gmail.com',
              pass: 'YourREALPassword'
            }
          });
          
          var mailOptions = {
            from: 'yourMail@gmail.com',
            to: email,
            subject: subject,
            text: message
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.write("<h1>Mail Sent Successfully!</h1>")
              res.end();
            }
          });

    })
    
})
app.listen(3000, function(){
    console.log("Server's up & running at port 3000.");
})