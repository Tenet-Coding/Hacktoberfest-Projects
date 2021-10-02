let a = document.getElementById('strengths');
let b = document.getElementById('weakness');
let c = document.getElementById('opportunities');
let d = document.getElementById('threats');
if (localStorage.getItem("strength") != null) {
    a.innerHTML = localStorage.getItem("strength");
    localStorage.removeItem("strength");
}
if (localStorage.getItem("weakness") != null) {
    b.innerHTML = localStorage.getItem("weakness");
    localStorage.removeItem("weakness");
}
if (localStorage.getItem("opportunitites") != null) {
    c.innerHTML = localStorage.getItem("opportunitites");
    localStorage.removeItem("opportunitites");
}
if (localStorage.getItem("threats") != null) {
    d.innerHTML = localStorage.getItem("threats");
    localStorage.removeItem("threats");
}