const quizDB = [
    {
        question: "Que. 1: - 🏠 🌷",
        ans: "housefull"
    },
    {
        question: "Que. 2: - ⏰ 😴 👦",
        ans: "wake up sid"
    },
    {
        question: "Que. 3: -  7️⃣ 🔪 🙏",
        ans: "7 khoon maaf"
    },
    {
        question: "Que. 4: - 🤟 🌟 ",
        ans: "rockstar"
    },
    {
        question: "Que. 5: - ♥ 💓 ✌ ",
        ans: "dil dhadakne do"
    }
    
];

const emojiQuestion = document.querySelector(".emoji-question");
const submit = document.querySelector("#submit");

const answers = document.querySelector(".answer");
const showScore = document.querySelector("#show-score");
// const timer = document.querySelector(".timer");

let score=0;
let questionCount=0;
// let timeLeft = 10;


const loadQuestion = ()=>{
    emojiQuestion.innerText = (quizDB[questionCount].question);
}


loadQuestion();

submit.addEventListener("click", () => {
    
    if(answers.value === quizDB[questionCount].ans){
        score++;
    }
    questionCount++;
    if(questionCount < quizDB.length){
        loadQuestion();
        document.getElementById('answer-input').value = ''
    }
    else{
        showScore.innerHTML = `<h3>Your score is <span>${score}/${quizDB.length}</span> ✌!</h3>
        <button class = "btn" onclick ="location.reload()">Play Again</button>
        `
        showScore.classList.remove("score-area");

    }
    
})

// const quizTimer = setInterval(() => {
//     if(timeLeft >= 0){
//         console.log(timeLeft);
        
//         timer.innerText = timeLeft;
//         timeLeft--;
//     }
// }, 1000);
// if(timeLeft === 0){
//     setTimeout("document.submit.submit()", 1);
//     timeLeft = 2;
// }


