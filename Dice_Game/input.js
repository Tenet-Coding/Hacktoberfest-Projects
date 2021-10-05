const btn = document.querySelector('.btn--all');
const closeBtn = document.querySelector('#close-btn');

closeBtn.addEventListener('click', function(){
    document.getElementById('alert-box').style.display="none";
});
btn.addEventListener('click', function(){
    var player1=document.getElementById('name-input1').value;
    var player2=document.getElementById('name-input2').value;
    if(player1==='' || player2===''){
        document.getElementById('alert-box').style.display="block";
    }
    else{
        sessionStorage.setItem("player1", player1);
        sessionStorage.setItem("player2", player2);
        location.href="game.html";
    }
});