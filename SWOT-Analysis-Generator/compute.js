var isclicked = false;
var btn = document.getElementById('btnHere');
btn.addEventListener("click", (e) => {
    e.preventDefault;
    isclicked = true;
    location.href = "generated.html"
})
if (isclicked == false) {
    document.getElementById('exampleFormControlTextarea2').addEventListener('blur',()=>
    {
        localStorage.setItem("weakness", document.getElementById('exampleFormControlTextarea2').value);
    }),
    document.getElementById('exampleFormControlTextarea1').addEventListener('blur',()=>
    {

        localStorage.setItem("strength", document.getElementById('exampleFormControlTextarea1').value);
    })
    document.getElementById('exampleFormControlTextarea4').addEventListener('blur',()=>
    {

        localStorage.setItem("threats",document.getElementById('exampleFormControlTextarea4').value);
    })
    document.getElementById('exampleFormControlTextarea3').addEventListener('blur',()=>
    {
        localStorage.setItem("opportunitites", document.getElementById('exampleFormControlTextarea3').value);

    })
}