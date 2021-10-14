const jokeCard=document.getElementById('joke-card');
const JOKE_API_URL="https://icanhazdadjoke.com/"
const newJoke=()=>{
    fetch(JOKE_API_URL, {
        headers: {
            Accept: "application/json"
        }
    })
    .then((data)=>data.json())
    .then((data)=>{
        jokeCard.innerText = `"${data.joke}"`
    })
    .catch((err)=>{console.error(err);});
}

(function ready() {
    newJoke();
    var content = document.querySelector('.content');
    content.onmousedown = function(e) {
      var round = document.createElement('div');
  
      round.className = 'wave';
      this.appendChild(round);
  
      x = e.pageX - this.offsetLeft;
      y = e.pageY - this.offsetTop;
  
      round.style.left = x + "px";
      round.style.top = y + "px";
      round.className += " anim";
  
      setTimeout(function() {
        round.remove();

      }, 3000);
    };
  
  }());