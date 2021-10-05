let board = document.querySelectorAll('.board')[0];
function buildBoard(){
	if(board.innerHTML == '')
	for(let i = 1; i <= 9; i++ ){
		let block = document.createElement('div');
		block.classList.add('block');
		block.setAttribute('id', i);
		board.appendChild(block);
	}
}
buildBoard()
let turn  = 0;
let won = document.getElementById('winner');
let windiv = document.querySelectorAll('.winner')[0];
let blocks = board.querySelectorAll('.block');
function checkWin(par){
	if( (blocks[0].innerText == par && blocks[1].innerText == par && blocks[2].innerText == par)||
		(blocks[3].innerText == par && blocks[4].innerText == par && blocks[5].innerText == par)||
		(blocks[6].innerText == par && blocks[7].innerText == par && blocks[8].innerText == par)||
		(blocks[0].innerText == par && blocks[3].innerText == par && blocks[6].innerText == par)||
		(blocks[1].innerText == par && blocks[4].innerText == par && blocks[7].innerText == par)||
		(blocks[2].innerText == par && blocks[5].innerText == par && blocks[8].innerText == par)||
		(blocks[0].innerText == par && blocks[4].innerText == par && blocks[8].innerText == par)||
		(blocks[2].innerText == par && blocks[4].innerText == par && blocks[6].innerText == par)
		)
		return 1;
}
function addListener(){
	blocks = board.querySelectorAll('.block');
	blocks.forEach((ele)=>{
		ele.addEventListener('click', ()=>{
			if(turn == 0 && ele.innerHTML == ""){
				ele.innerHTML = `<h2>O</h2>`;
				if(checkWin('O')){
					board.innerHTML='';
					windiv.style.display="flex";
					won.innerText = "O won";
				}
				turn = 1;
			}
			if(turn == 1 && ele.innerText == ""){
				ele.innerHTML = `<h2>X</h2>`;
				if(checkWin('X')){
					board.innerHTML='';
					windiv.style.display="flex";
					won.innerText = "X won";
				}
				turn = 0;
			}
		});
	});
}
addListener();
document.getElementById('play').addEventListener('click', ()=> {
	board.innerHTML='';
	won.innerText = '';
	buildBoard();
	addListener();
});
