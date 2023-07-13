const questions = [
    {
        question: "What is JavaScript?",
        answers: [
            {
                text: "A type of coffee.",
                correct: false
            },
            {
                text: "A programming language commonly used for web development.",
                correct: true
            },
            {
                text: "A popular video game.",
                correct: false
            },
            {
                text: "A new social media platform.",
                correct: false
            }
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            {
                text: "var",
                correct: true
            },
            {
                text: "let",
                correct: false
            },
            {
                text: "const",
                correct: false
            },
            {
                text: "int",
                correct: false
            }
        ]
    },
    {
        question: "What is the purpose of the 'document.getElementById()' method in JavaScript?",
        answers: [
            {
                text: "To add event listeners to an HTML element.",
                correct: false
            },
            {
                text: "To create a new HTML element.",
                correct: false
            },
            {
                text: "To modify the style of an HTML element.",
                correct: false
            },
            {
                text: "To retrieve an HTML element based on its unique identifier.",
                correct: true
            }
        ]
    },
    {
        question: "What is an example of an event in JavaScript?",
        answers: [
            {
                text: "Writing a function",
                correct: false
            },
            {
                text: "Clicking a button",
                correct: true
            },
            {
                text: "Declaring a variable",
                correct: false
            },
            {
                text: "Importing a library",
                correct: false
            }
        ]
    },
    {
        question: "What does the 'typeof' operator in JavaScript do?",
        answers: [
            {
                text: "Returns the data type of a variable or expression.",
                correct: true
            },
            {
                text: "Checks if a variable is defined.",
                correct: false
            },
            {
                text: "Compares two values for equality.",
                correct: false
            },
            {
                text: "Performs a mathematical operation.",
                correct: false
            }
        ]
    },
    {
        question: "What is an array in JavaScript?",
        answers: [
            {
                text: "A loop that repeats a block of code.",
                correct: false
            },
            {
                text: "A function that executes a set of instructions.",
                correct: false
            },
            {
                text: "A data structure that stores multiple values in a single variable.",
                correct: true
            },
            {
                text: "A conditional statement that executes different actions based on a condition.",
                correct: false
            }
        ]
    },
    {
        question: "What is the purpose of the 'push()' method in JavaScript?",
        answers: [
            {
                text: "To remove elements from an array.",
                correct: false
            },
            {
                text: "To add elements to the end of an array.",
                correct: true
            },
            {
                text: "To sort the elements of an array in ascending order.",
                correct: false
            },
            {
                text: "To convert an array to a string.",
                correct: false
            }
        ]
    },
    {
        question: "What is the result of the expression '2 + 2 + '2' in JavaScript?",
        answers: [
            {
                text: "'42'",
                correct: true
            },
            {
                text: "'6'",
                correct: false
            },
            {
                text: "'22'",
                correct: false
            },
            {
                text: "'4'",
                correct: false
            }
        ]
    },
    {
        question: "What does the 'NaN' value represent in JavaScript?",
        answers: [
            {
                text: "Not-a-Number, indicating an invalid or unrepresentable value.",
                correct: true
            },
            {
                text: "The number zero.",
                correct: false
            },
            {
                text: "An infinite value.",
                correct: false
            },
            {
                text: "A string value.",
                correct: false
            }
        ]
    },
    {
        question: "What is the purpose of the 'JSON.stringify()' method in JavaScript?",
        answers: [
            {
                text: "To execute an asynchronous task in JavaScript.",
                correct: false
            },
            {
                text: "To parse a JSON string into a JavaScript object.",
                correct: false
            },
            {
                text: "To remove an element from a JavaScript array.",
                correct: false
            },
            {
                text: "To convert a JavaScript object into a JSON string.",
                correct: true
            }
        ]
    }


]

let timeLeft = 0
let finalScore = 0
let finished = false


document.getElementById('start_button').onclick = function () {
    document.getElementById('question_num').value = 0
    document.getElementById('score').value = 0
    finished = false
    loadQuestion(0)
    document.getElementById('startpage').hidden = true
    document.getElementById('q1').hidden = false;

    timeLeft = 90
    document.getElementById('timer').innerText = '(' + timeLeft + 's)'

    const intervalId = setInterval(function () {
        // Your function logic goes here

        timeLeft--; // Decrement the value

        document.getElementById('timer').innerText = '(' + timeLeft + 's)'

        if (timeLeft <= 0 || finished === true) {
            clearInterval(intervalId); // Stop the interval when value is 0

            if (finished !== true) finishQuiz()
        }
    }, 1000);
}

function finishQuiz() {
    finished = true
    finalScore = document.getElementById('score').value * (timeLeft + 1)
    document.getElementById('score_text').innerText = finalScore
    document.getElementById('q1').hidden = true
    document.getElementById('finishpage').hidden = false;
}
function correctAnswer() {
    window.alert("Correct!")

    const questionNum = document.getElementById('question_num').value
    document.getElementById('score').value++

    if (parseInt(questionNum) + 1 <= questions.length - 1) {
        document.getElementById('question_num').value++
        loadQuestion(document.getElementById('question_num').value)
    } else {
        document.getElementById('question_num').value++
        finishQuiz()
    }
}

function incorrectAnswer() {
    timeLeft -= 10
    document.getElementById('timer').innerText = '(' + timeLeft + 's)'
    window.alert("Incorrect!")
}

function submitAnswer(a) {
    const question = questions[document.getElementById('question_num').value]
    const answer = question.answers[a]

    if (answer.correct) {
        correctAnswer()
    } else {
        incorrectAnswer()
    }

}


function loadQuestion(questionNumber) {
    const question = questions[questionNumber] ?? {
        question: "Error",
        answers: [{ text: "Error" }, { text: "Error" }, { text: "Error" }, { text: "Error" }]
    }

    for (const a in question.answers) {
        const button = document.getElementById("answer_button_" + a)
        button.innerText = question.answers[a].text
    }

    document.getElementById("quest_text").innerText = question.question
}

window.addEventListener("load", (event) => {
    console.log("Page is ready to load questions...");

    const scores = window.localStorage.getItem('scores');

    console.log(scores)
    if (!scores || scores === "") {
        console.log("Creating table...")
        window.localStorage.setItem('scores', "[]");
    }
});

function submitScore() {
    let scores = JSON.parse(window.localStorage.getItem('scores'))
    let username = document.getElementById('username').value ?? "Player"

    scores.push({ username: username, score: finalScore })

    window.localStorage.setItem('scores', JSON.stringify(scores));

    document.getElementById('finishpage').hidden = true;
    loadLeaderboard()
    document.getElementById('leaderboard').hidden = false
}

function loadLeaderboard() {
    let scores = JSON.parse(window.localStorage.getItem('scores'))

    scores.sort((a, b) => {
        return b.score - a.score
    })

    const topScores = scores.slice(0, 3)
    console.log(topScores)
    for (let i = 0; i < 3; i++) {
        console.log(i)
        if (topScores[i]) {
            document.getElementById('lb-' + i).innerText = parseInt(i) + 1 + '. ' + topScores[i].username + ' - ' + topScores[i].score;
        } else {
            document.getElementById('lb-' + i).innerText = parseInt(i) + 1 + ". N/A"
        }
    }
}

function clearLeaderboard() {
    window.localStorage.setItem('scores', "[]");
    loadLeaderboard()
}

function returnHome() {
    document.getElementById('leaderboard').hidden = true
    document.getElementById('startpage').hidden = false
}

function viewLeaderboard() {
    document.getElementById('startpage').hidden = true
    loadLeaderboard()
    document.getElementById('leaderboard').hidden = false
}
