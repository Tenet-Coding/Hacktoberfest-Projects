const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');
const modalBtns = document.querySelectorAll('.modal-open');

modalBtns.forEach(function(btn){
	btn.onclick = function(){
		var modal = btn.getAttribute("data-modal");
		document.getElementById(modal).style.display = "block";
	};
});

const closeBtns = document.querySelectorAll(".modal-close");

closeBtns.forEach(function(btn){
btn.onclick = function(){
	var modal = (btn.closest(".modal").style.display="none");
}
});

window.onclick = function(e){
	if(e.target.className == "modal"){
		e.target.style.display = "none";
	}
};
hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});