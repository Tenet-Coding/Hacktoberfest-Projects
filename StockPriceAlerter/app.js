const fyers = require("fyers-api-v2");
const nodemailer = require('nodemailer');
let fromMail = process.env.FROMMAIL;
let toMail = process.env.TOMAIL;
let subject = 'Prices';
let text = "Prices have crossed!";
require('dotenv').config();
//imports and data setup
fyers.setAppId(process.env.APP_ID);
fyers.setRedirectUrl("https://localhost:3000/");
fyers.setAccessToken(process.env.ACCESS_TOKEN)
//fyers config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: fromMail ,
        pass: process.env.PASSWORD
    }
    });
//creating nodemailer transporter
    let mailOptions = {
        from: fromMail,
        to: toMail,
        subject: subject,
        text: text
        };
//setting mail options
    async function getQuotes(){
        let quotes = new fyers.quotes()
        let result = await quotes
            .setSymbol('NSE:NIFTYBANK-INDEX')
            .getQuotes();
            console.log(result.d[0])
            if(result.d[0].v.cmd.c>36000.00)
            { transporter.sendMail(mailOptions, (error, response) => {
if (error) {
    console.log(error);
}
console.log(response)
});}}
//function to get market quotes from fyers-api-v2		
getQuotes();
//function call