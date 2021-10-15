## Stock Price Alerter
## Working
User gets a mail as shown when stock prices cross the set amount

![prices](https://user-images.githubusercontent.com/58522375/137500586-a85879cd-1b41-4c06-85f6-9fe6fd3f112a.PNG)
## Description
A node app that fetches stock prices from Fyers-api and sends mail alerts to user when a particular stock (customizable) price crosses some value (customizable).
User can choose the stock to track and set the value. User can also set the toMail, fromMail and must provide the password of sending mail account to **nodemailer** in the code.
User will also require API keys and APP_ID from fyers dashboard.
All such data can be stored in an env file.
## Requirements
- A fyers account to generate API keys and APP_ID.
- A valid gmail account for nodemailer.
## Setup
- Once all the relevant data are stored in the environment file, the user can install all dependencies using **npm i**.
- Then user can simply run the node app with **node index.js**.
## Author 
VaithiSniper

https://github.com/VaithiSniper
