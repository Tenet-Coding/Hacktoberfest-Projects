function phonenumber() {
    const inputtxt = document.getElementById("input").value;
    const result = document.getElementById("result");
    console.log(inputtxt)
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (inputtxt.match(phoneno)) {
        result.innerText = "Phone number is valid"
        return true;
    }
    else {
        result.innerText = "Phone number is invalid"
        return false;
    }
}