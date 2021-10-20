let leaderboard = [];

if (localStorage.getItem("leaderboard")) {
	leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
	updateLeaderboard();
} else {
	leaderboard = [];
}

function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomOperator() {
	return ["+", "-", "/", "*", "%"][randomIntFromInterval(0, 4)];
}

function formatTime(s) {
	const minutes = Math.floor(s / 60).toString(),
		seconds = (s % 60).toString();

	minutes.padStart(2, "0");
	seconds.padStart(2, "0");

	return `${minutes}m ${seconds}s`;
}

function toggleStartButton() {
	if (document.querySelector("#startButton").classList.contains("hidden")) {
		document.querySelector("#startButton").classList.remove("hidden");
	} else {
		document.querySelector("#startButton").classList.add("hidden");
	}
}

function updateLeaderboard() {
	const placementContainer = document.querySelector(
		"div[data-container-id='placements']"
	);
	placementContainer.innerHTML = "";
	for (let i = 0; i < leaderboard.length; i++) {
		let placementEmoji = ["🥇", "🥈", "🥉"];
		let placementClasses = [];
		let topThree = i < 3 ? placementClasses[i] : "";
		let template = `<div class="border-2 rounded-md shadow-md flex flex-1 gap-4 p-4 ${topThree}">
            <h3 class="font-bold">${i + 1}</h3>
            <p class="flex-2">${leaderboard[i].name}</p>
            <p class="flex-1 text-right">${leaderboard[i].score} (${formatTime(
      leaderboard[i].time
    )})</p>
          </div>`;
		let templateTop = `<div class="border-2 rounded-md shadow-md flex flex-1 gap-4 p-4 ${topThree}">
            <h3 class="font-bold">${placementEmoji[i]}</h3>
            <p class="flex-2">${leaderboard[i].name}</p>
            <p class="flex-1 text-right">${leaderboard[i].score} (${formatTime(
      leaderboard[i].time
    )})</p>
          </div>`;

		if (i < 3) {
			placementContainer.innerHTML += templateTop;
		} else {
			placementContainer.innerHTML += template;
		}
	}

	localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function toggleLeaderboard() {
	const leaderboardContainer = document.querySelector(
		"div[data-section-id='leaderboard']"
	);

	if (leaderboardContainer.classList.contains("hidden")) {
		leaderboardContainer.classList.remove("hidden");
	} else {
		leaderboardContainer.classList.add("hidden");
	}
}

class Question {
	text = "";
	problem = {
		operand1: 0,
		operand2: 0,
		operator: "",
	};
	answer = 0;

	getAnswer(problem) {
		switch (problem.operator) {
			case "+":
				return problem.operand1 + problem.operand2;
				break;
			case "-":
				return problem.operand1 - problem.operand2;
				break;
			case "/":
				return Math.round(problem.operand1 / problem.operand2);
				break;
			case "*":
				return problem.operand1 * problem.operand2;
				break;
			case "%":
				return problem.operand1 % problem.operand2;
				break;
		}
	}

	generateQuestion() {
		do {
			this.problem.operand1 = randomIntFromInterval(0, 10);
			this.problem.operand2 = randomIntFromInterval(0, 10);
			this.problem.operator = randomOperator();
		} while (
			(this.problem.operator == "/" &&
				(this.problem.operand1 == 0 || this.problem.operand2 == 0)) ||
			(this.problem.operator == "%" &&
				this.problem.operand1 == 0 &&
				this.problem.operand2 == 0)
		);

		this.answer = this.getAnswer(this.problem);
		this.text = `${this.problem.operand1} ${this.problem.operator} ${this.problem.operand2} = `;
	}

	constructor() {
		this.generateQuestion();
	}
}

function checkAnswer(el, e) {
	if (e.keyCode == 13) {
		const parent = el.parentElement;
		el.getAttribute("data-question-id");
	}
}

class Quiz {
	timer;
	time = 0; // seconds
	size = 5; // size of the quiz
	score = 0;
	answered = 0;
	questions = []; // array of questions

	populateQuestions() {
		for (let i = 0; i < this.size; i++) {
			this.questions.push(new Question());
		}
	}

	isCorrect(index, answer) {
		this.answered++;

		if (this.questions[index].answer == answer) {
			return true;
		}

		return false;
	}

	startTimer() {
		this.timer = setInterval(() => {
			this.time += 1;
		}, 1000);
	}

	stopTimer() {
		clearInterval(this.timer);
	}

	generateQuiz() {
		const quizContainer = document.querySelector(
			"div[data-container-id='quiz']"
		);
		let content = "";
		let num = 0;
		for (let question of this.questions) {
			content += `<div class="border-2 border-gray-500 rounded-md flex p-4">
        <p class="flex-2 mr-4">${question.text}</p>
        <input type="number" data-question-id="${num}" />
      </div>`;
			num++;
		}

		quizContainer.innerHTML = content;
	}

	increaseScore() {
		this.score++;
	}

	constructor() {
		this.populateQuestions();
		this.generateQuiz();

		this.startTimer();
	}
}

function start() {
	let quiz = new Quiz();
	document.querySelector("#startButton").classList.add("hidden");
	toggleLeaderboard();

	document.querySelectorAll("input[data-question-id]").forEach((el) => {
		el.addEventListener("keyup", function(e) {
			if (e.keyCode == 13) {
				if (
					quiz.isCorrect(this.getAttribute("data-question-id"), e.target.value)
				) {
					quiz.increaseScore();
					el.parentElement.classList.add("border-blue-500", "bg-blue-300");
				} else {
					el.parentElement.classList.add("border-red-500", "bg-red-300");
				}

				this.setAttribute("disabled", "disabled");

				if (quiz.answered == quiz.size) {
					quiz.stopTimer();

					let player = {
						name: prompt("Enter your name: "),
						score: quiz.score,
						time: quiz.time,
						date: new Date(),
					};

					leaderboard.push(player);

					updateLeaderboard();
					toggleLeaderboard();
					toggleStartButton();
				}
			}
		});
	});
}