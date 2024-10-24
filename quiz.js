const readlineSync = require('readline-sync');

const questions = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2 + 2?', answer: '4' },
    { question: 'What is the color of the sky?', answer: 'blue' }
];

let score = 0;
let currentQuestionIndex = 0;

const totalQuizTime = 30; 
const timePerQuestion = 10; 
let timeLeft = totalQuizTime; 


const quizTimer = setInterval(() => {
    timeLeft--;
    console.log(`Time left for the quiz: ${timeLeft} seconds`);

    if (timeLeft === 0) {
        console.log('Time is up! Quiz over.');
        endQuiz();
    }
}, 1000);


function askQuestion() {
    if (currentQuestionIndex >= questions.length) {
        console.log('You have answered all the questions!');
        endQuiz();
        return;
    }

    console.log(`\nQuestion ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex].question}`);
    
    let currentQuestionTime = timePerQuestion;

    const questionTimer = setInterval(() => {
        currentQuestionTime--;
        console.log(`Time left for this question: ${currentQuestionTime} seconds`);

        if (currentQuestionTime === 0) {
            console.log('Time is up for this question!');
            clearInterval(questionTimer);
            currentQuestionTime = timePerQuestion;
            moveToNextQuestion();
        }
    }, 1000);

    const answer = readlineSync.question('Your answer: ');

    clearInterval(questionTimer);

    if (answer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
        console.log('Correct!');
        score++;
    } else {
        console.log('Incorrect!');
    }

    currentQuestionTime = timePerQuestion;
    moveToNextQuestion();
}


function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        console.log('Quiz completed!');
        endQuiz();
    } else {
        askQuestion();
    }
}


function endQuiz() {
    console.log(`\nQuiz Over! Your final score is: ${score}/${questions.length}`);
    clearInterval(quizTimer);
    process.exit();
}


console.log('Welcome to the Quiz!');
askQuestion();
