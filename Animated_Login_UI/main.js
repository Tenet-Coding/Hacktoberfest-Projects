
// Getting Query from the main.html

const login = document.querySelector(".login-a");
const register = document.querySelector(".register-a");
const forgot = document.querySelector(".forgot-a");
const close = document.querySelector(".iconclose");

//getting Query from the main.css
const loginSection = document.querySelector(".login");
const registerSection = document.querySelector(".register");

const forgotSection = document.querySelector(".forgot");

//Event triggers when the register button is clicked on the Login page
register.addEventListener("click", (e) => {
   loginSection.style.display = "none";
   registerSection.style.display = "flex";
});

//Event triggers when the login button is clicked on the register page
login.addEventListener("click", (e) => {
    registerSection.style.display = "none";
    loginSection.style.display = "flex";
 });

 //Event triggers when the forgot button is clicked on the Login page

 forgot.addEventListener("click", (e) => {
    loginSection.style.display = "none";
    forgotSection.style.display = "flex";
 });
 //Event triggers when the cross icon is clicked on the reset page

 close.addEventListener("click", (e) => {
    loginSection.style.display = "flex";
    forgotSection.style.display = "none";
 });
