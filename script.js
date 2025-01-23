const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 90) + 10; // Two-digit number
    const num2 = Math.floor(Math.random() * 90) + 10; // Two-digit number
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let correctAnswer;
    if (operation === '+') correctAnswer = num1 + num2;
    if (operation === '-') correctAnswer = num1 - num2;
    if (operation === '*') correctAnswer = num1 * num2;
    if (operation === '/') correctAnswer = parseFloat((num1 / num2).toFixed(2)); // Round to 2 decimals

    return { num1, num2, operation, correctAnswer };
}

function generateOptions(correctAnswer) {
    const options = new Set([correctAnswer]);
    while (options.size < 5) {
        const randomOffset = Math.random() * 20 - 10; // Random offset between -10 and +10
        const randomOption = 
            correctAnswer + parseFloat(randomOffset.toFixed(2));
        options.add(randomOption);
    }
    return Array.from(options).sort(() => Math.random() - 0.5); // Shuffle options
}

function renderQuestion() {
    resultEl.textContent = '';
    const { num1, num2, operation, correctAnswer } = generateQuestion();

    questionEl.textContent = `What is ${num1} ${operation} ${num2}?`;
    const options = generateOptions(correctAnswer);

    optionsEl.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, correctAnswer));
        optionsEl.appendChild(button);
    });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        resultEl.textContent = 'Correct!';
        resultEl.style.color = 'green';
    } else {
        resultEl.textContent = `Wrong! The correct answer was ${correctAnswer}.`;
        resultEl.style.color = 'red';
    }
    setTimeout(renderQuestion, 1000); // Show next question after 2 seconds
}

renderQuestion();
