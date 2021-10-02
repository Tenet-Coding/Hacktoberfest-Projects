document.addEventListener("DOMContentLoaded", () => {


    const cardArray = [
        {
            name: 'fries',
            img: 'fries.png'
        },
        {
            name: 'pizza',
            img: 'pizza.png'
        },
        {
            name: 'milkshake',
            img: 'milkshake.png'
        },
        {
            name: 'fries',
            img: 'fries.png'
        },
        {
            name: 'ice-cream',
            img: 'ice-cream.png'
        },
        {
            name: 'hotdog',
            img: 'hotdog.png'
        },
        {
            name: 'cheeseburger',
            img: 'cheeseburger.png'
        },
        {
            name: 'pizza',
            img: 'pizza.png'
        },

        {
            name: 'milkshake',
            img: 'milkshake.png'
        },
        {
            name: 'ice-cream',
            img: 'ice-cream.png'
        },
        {
            name: 'hotdog',
            img: 'hotdog.png'
        },
        {
            name: 'cheeseburger',
            img: 'cheeseburger.png'
        }
    ]
cardArray.sort(()=> 0.5-Math.random())
   var cardschosen=[]
    var cardschosenId=[]
    var cardswon=[]
    const grid=document.querySelector(".grid")
    const resultdisplay=document.querySelector("#result")
    //card baord
function createboard(){

for(let i=0;i<cardArray.length;i++){
const card=document.createElement('img')
card.setAttribute('data-id',i)
card.setAttribute('src','blank.png')
card.addEventListener("click",flipcard)
grid.appendChild(card)
}
}

//matchfor
function checkformatch(){
var cards=document.querySelectorAll('img')
const optionOneId=cardschosenId[0];
const optiontwoId=cardschosenId[1];
if(cardschosen[0]===cardschosen[1]){
    alert('you found a match')
    cards[optionOneId].setAttribute('src','white.png')
    cards[optiontwoId].setAttribute('src','white.png')
cardswon.push(cardschosen)
}else{
  
    cards[optionOneId].setAttribute('src','blank.png')
    cards[optiontwoId].setAttribute('src','blank.png')
    alert('Sorry try again')
}
 cardschosen=[]
 cardschosenId=[]
 resultdisplay.textContent=cardswon.length
if(cardswon.length===cardArray.length/2){
    resultdisplay.textContent=  'congratulations round  completed'
    alert("Game Over");
}
}







//flip the card
function flipcard(){
let cardId=this.getAttribute('data-id')
cardschosen.push(cardArray[cardId].name)
cardschosenId.push(cardId)
this.setAttribute('src',cardArray[cardId].img)
if(cardschosen.length===2){
    setTimeout(checkformatch,500)
}

}
createboard();




})
