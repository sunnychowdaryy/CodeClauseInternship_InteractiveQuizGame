const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    {
        question: 'What number comes next in the sequence? 1, 1, 2, 3, 5, 8, ...',
        answers: [
            { text: '13', correct: true },
            { text: '10', correct: false },
            { text: '11', correct: false },
            { text: '12', correct: false }
        ]
    },
    {
        question: 'What is the next letter in the series? A, C, E, G, ...',
        answers: [
            { text: 'I', correct: true },
            { text: 'H', correct: false },
            { text: 'J', correct: false },
            { text: 'K', correct: false }
        ]
    },
    {
        question: 'If you rearrange the letters "CIFAIPC" you get the name of a:',
        answers: [
            { text: 'City', correct: false },
            { text: 'Animal', correct: false },
            { text: 'Ocean', correct: true },
            { text: 'Mountain', correct: false }
        ]
    },
    {
        question: 'Which of the following can be arranged into a 5-letter English word: "H R G S T I"',
        answers: [
            { text: 'HIRST', correct: false },
            { text: 'SHIRT', correct: true },
            { text: 'SHRIT', correct: false },
            { text: 'STHIR', correct: false }
        ]
    },
    {
        question: 'Which one of the following is least like the other four?',
        answers: [
            { text: 'Tiger', correct: false },
            { text: 'Leopard', correct: false },
            { text: 'Elephant', correct: true },
            { text: 'Lion', correct: false }
        ]
    },
    {
        question: 'Which number does not belong in the series? 2, 3, 5, 7, 11, 14, 17, 19',
        answers: [
            { text: '3', correct: false },
            { text: '14', correct: true },
            { text: '11', correct: false },
            { text: '19', correct: false }
        ]
    },
    {
        question: 'Mary’s father has five daughters – Nana, Nene, Nini, Nono. What is the fifth daughter’s name?',
        answers: [
            { text: 'Nunu', correct: false },
            { text: 'Nana', correct: false },
            { text: 'Mary', correct: true },
            { text: 'Nene', correct: false }
        ]
    },
    {
        question: 'Which word does not belong with the others?',
        answers: [
            { text: 'Parsley', correct: true },
            { text: 'Basil', correct: false },
            { text: 'Dill', correct: false },
            { text: 'Cinnamon', correct: false }
        ]
    },
    {
        question: 'Find the odd one out: 2, 4, 6, 8, 9, 10, 12',
        answers: [
            { text: '4', correct: false },
            { text: '6', correct: false },
            { text: '9', correct: true },
            { text: '12', correct: false }
        ]
    },
    {
        question: 'Which of the following is a fruit?',
        answers: [
            { text: 'Potato', correct: false },
            { text: 'Carrot', correct: false },
            { text: 'Apple', correct: true },
            { text: 'Broccoli', correct: false }
        ]
    },
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', () => {
    window.location.reload();
});

function startGame() {
    startButton.parentElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = `Question ${currentQuestionIndex + 1}: ${question.question}`;
    question.answers.forEach((answer, index) => {
        const answerContainer = document.createElement('div');
        answerContainer.classList.add('answer-container');

        const optionNumber = document.createElement('span');
        optionNumber.innerText = `Option ${index + 1}: `;
        optionNumber.classList.add('option-number');

        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);

        answerContainer.appendChild(optionNumber);
        answerContainer.appendChild(button);
        answerButtonsElement.appendChild(answerContainer);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);
    Array.from(answerButtonsElement.children).forEach(answerContainer => {
        const button = answerContainer.querySelector('button');
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    questionContainerElement.classList.add('hide');
    resultContainerElement.classList.remove('hide');
    scoreElement.innerText = score;
}
