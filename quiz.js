const readlineSync = require('readline-sync');

const questions = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2 + 2?', answer: '4' },
    { question: 'What is the color of the sky?', answer: 'blue' },
    { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
    { question: 'Who wrote the play "Romeo and Juliet"?', answer: 'Shakespeare' },
    { question: 'What is the chemical symbol for water?', answer: 'H2O' },
    { question: 'How many continents are there?', answer: '7' },
    { question: 'What is the square root of 64?', answer: '8' }
];

let score = 0;
let currentQuestionIndex = 0;

const totalQuizTime = 30;  
const timePerQuestion = 10; 
let timeLeft = totalQuizTime;  
let currentQuestionTime = timePerQuestion; 


const quizTimer = setInterval(() => {
    timeLeft--;
    console.clear();  

    console.log(`Time left for the quiz: ${timeLeft} seconds`);

    if (timeLeft === 0) {
        console.log('Time is up! Quiz over.');
        clearInterval(quizTimer); 
        endQuiz(); 
    }
}, 1000);


function askQuestion() {
    if (currentQuestionIndex >= questions.length) {
        console.log('You have answered all the questions!');
        endQuiz();
        return;
    }

    console.clear();  
    console.log(`Question ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex].question}`);

    
    let questionTimer = setInterval(() => {
        currentQuestionTime--;
        console.log(`Time left for this question: ${currentQuestionTime} seconds`);

        if (currentQuestionTime === 0) {
            console.log('Time is up for this question!');
            clearInterval(questionTimer); 
            moveToNextQuestion(); 
        }
    }, 1000);

    
    let answer = readlineSync.question('Your answer: ').trim();

    
    while (!answer) {
        console.log('Invalid input! Please provide a valid answer.');
        answer = readlineSync.question('Your answer: ').trim();
    }

    
    if (answer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
        console.log('Correct!');
        score++;
    } else {
        console.log('Incorrect!');
    }

    clearInterval(questionTimer); 
    moveToNextQuestion(); 
}


function moveToNextQuestion() {
    currentQuestionTime = timePerQuestion; 
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        console.log('Quiz completed!');
        endQuiz();
    } else {
        askQuestion(); 
    }
}


function endQuiz() {
    console.clear();  
    console.log(`\nQuiz Over! Your final score is: ${score}/${questions.length}`);
    clearInterval(quizTimer); 
    process.exit(); 
}

console.log('Welcome to the Quiz!');
askQuestion();  
