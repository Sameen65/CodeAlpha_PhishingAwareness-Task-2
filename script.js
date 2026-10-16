
const questions = [
    {
        question: "1. You receive an email asking you to verify your password urgently. What should you do?",
        answers: [
            "Click the link immediately",
            "Reply with your password",
            "Verify the request through the official website"
        ],
        correct: 2,
        explanation: "Correct! Visit the official website directly instead of following an unexpected link."
    },
    {
        question: "2. Which is a common warning sign of phishing?",
        answers: [
            "An unexpected request with urgent threats",
            "A message you were expecting from a verified contact",
            "A bookmarked official website"
        ],
        correct: 0,
        explanation: "Urgent threats are often used to pressure people into making unsafe decisions."
    },
    {
        question: "3. What does smishing mean?",
        answers: [
            "Phishing through SMS messages",
            "A computer software update",
            "A secure email connection"
        ],
        correct: 0,
        explanation: "Smishing is phishing conducted through text messages."
    },
    {
        question: "4. What should you do with a suspicious email attachment?",
        answers: [
            "Open it to see what it contains",
            "Forward it to all your contacts",
            "Avoid opening it and report the message"
        ],
        correct: 2,
        explanation: "Do not open unexpected attachments. Report them using your organization's approved process."
    },
    {
        question: "5. What does MFA help protect?",
        answers: [
            "Only your internet speed",
            "Your accounts by requiring additional verification",
            "Your computer screen brightness"
        ],
        correct: 1,
        explanation: "Multifactor authentication adds another layer of protection to your account."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");

function showQuestion() {
    answered = false;

    const item = questions[currentQuestion];

    questionElement.textContent = item.question;
    answersElement.replaceChildren();
    feedbackElement.textContent = "";
    scoreElement.textContent = "";
    nextButton.hidden = true;

    item.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(index));

        answersElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const item = questions[currentQuestion];
    const buttons = answersElement.querySelectorAll("button");

    if (selectedIndex === item.correct) {
        score++;
        feedbackElement.textContent = "Correct! " + item.explanation;
    } else {
        feedbackElement.textContent =
            "Not quite. " + item.explanation;
    }

    buttons.forEach((button) => {
        button.disabled = true;
    });

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "View Final Score";
    } else {
        nextButton.textContent = "Next Question";
    }

    nextButton.hidden = false;
}

function showFinalScore() {
    questionElement.textContent = "Quiz Completed!";
    answersElement.replaceChildren();
    feedbackElement.textContent =
        "You scored " + score + " out of " + questions.length + ".";
    scoreElement.textContent =
        score === questions.length
            ? "Excellent work! You answered every question correctly."
            : "Review the training material and try again to improve your score.";

    nextButton.textContent = "Try Again";
    nextButton.hidden = false;
    nextButton.onclick = restartQuiz;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    nextButton.onclick = nextQuestion;
    showQuestion();
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showFinalScore();
    }
}

nextButton.addEventListener("click", nextQuestion);

showQuestion();
