let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let attemptsLeft = 1;

function startQuiz() {
    const addition = document.getElementById('addition').checked;
    const subtraction = document.getElementById('subtraction').checked;
    const minNumber = parseInt(document.getElementById('min-number').value);
    const maxNumber = parseInt(document.getElementById('max-number').value);
    const numQuestions = parseInt(document.getElementById('num-questions').value);
    const numAttempts = parseInt(document.getElementById('num-attempts').value);

    if (!addition && !subtraction) {
        alert('Please select at least one operation.');
        return;
    }

    questions = generateQuestions(addition, subtraction, minNumber, maxNumber, numQuestions);
    attemptsLeft = numAttempts;

    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
}

function generateQuestions(addition, subtraction, min, max, num) {
    const questions = [];
    for (let i = 0; i < num; i++) {
        let a = Math.floor(Math.random() * (max - min + 1)) + min;
        let b = Math.floor(Math.random() * (max - min + 1)) + min;
        let operation = addition && subtraction ? (Math.random() < 0.5 ? '+' : '-') : (addition ? '+' : '-');
        
        if (operation === '-' && a < b) {
            [a, b] = [b, a]; // Swap to avoid negative results
        }

        const question = {
            a,
            b,
            operation,
            answer: operation === '+' ? a + b : a - b
        };
        questions.push(question);
    }
    return questions;
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `Question ${currentQuestionIndex + 1}`;
    document.getElementById('question').innerText = `${question.a} ${question.operation} ${question.b}`;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('next-button').classList.add('hidden');
}

function appendNumber(number) {
    document.getElementById('answer').value += number;
}

function clearAnswer() {
    document.getElementById('answer').value = '';
}

function submitAnswer() {
    const answer = parseInt(document.getElementById('answer').value);
    const question = questions[currentQuestionIndex];

    if (isNaN(answer)) {
        alert('Please enter an answer.');
        return;
    }

    if (answer === question.answer) {
        document.getElementById('feedback').innerText = `Correct! The answer is ${question.answer}`;
        document.getElementById('feedback').className = 'correct';
        correctAnswers++;
        document.getElementById('next-button').classList.remove('hidden');
    } else {
        attemptsLeft--;
        document.getElementById('answer').value = ''; // Clear the text field
        if (attemptsLeft > 0) {
            document.getElementById('feedback').innerText = 'Try again';
            document.getElementById('feedback').className = 'incorrect';
        } else {
            document.getElementById('feedback').innerText = `The correct answer is ${question.answer}`;
            document.getElementById('feedback').className = 'answer';
            document.getElementById('next-button').classList.remove('hidden');
        }
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    attemptsLeft = parseInt(document.getElementById('num-attempts').value);

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showSummary();
    }
}

function showSummary() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('summary-screen').classList.remove('hidden');
    document.getElementById('summary').innerText = `You answered ${correctAnswers} out of ${questions.length} questions correctly.`;

    if (correctAnswers === questions.length) {
        document.getElementById('star').classList.remove('hidden');
    }
}
