// creating the main variables 
let questionBank = [
    {
        question: `The 'this' keyword always refers to the global object.`,
        option1: 'True',
        option2: 'False',
        answer: 'option1'
    },
    {
        question: 'The parseInt function can convert a string to an integer.',
        option1: 'True',
        option2: 'False',
        answer: 'option2'
    },
    {
        question: 'In JavaScript, arrays are objects',
        option1: 'True',
        option2: 'False',
        answer: 'option1'
    },
    {
        question: 'The push method can be used to add elements to the end of an array.',
        option1: 'True',
        option2: 'False',
        answer: 'option1'
    },
    {
        question: 'The == operator performs type coercion before comparing values.',
        option1: 'True',
        option2: 'False',
        answer: 'option1'
    },
    {
        question: 'Question: What is the output of the following code? console.log(10 + "5");',
        option1: 15,
        option2: 105,
        option3: `'15'`,
        option4: `'105'`,
        answer: 'option2'
    },
    {
        question: 'Question: What does the typeof operator return for the value null? console.log(typeof null)',
        option1: 'null',
        option2: 'undefined',
        option3: 'object',
        option4: 'string',
        answer: 'option3'
    },
    {
        question: 'Question: What is the correct syntax to add an event listener to a button with the ID myButton?',
        option1: 'document.getElementById("myButton").addEventListener(click, function() { ... });',
        option2: 'document.getElementById("myButton").addEventListener("click", function() { ... });',
        option3: 'document.getElementById("myButton").addEvent(click, function() { ... });',
        answer: 'option2'
    },
    {
        question: 'Question: What will the following code print?         var x = 10; function test(){var x = 20;    console.log(x);}    test();',
        option1: 10,
        option2: 20,
        option3: 'undefined',
        option4: 'null',
        answer: 'option2'
    },
    {
        question: 'Question: What is the output of the following code?      var arr = [1, 2, 3, 4, 5];  console.log(arr.slice(1, 3));',
        option1: [1, 2],
        option2: [2, 3],
        option3: [3, 4],
        option4: [1, 2, 3],
        answer: 'option2'
    }
];

const quizContainer = document.querySelector('#quiz-container');
const startQuizBtn = document.querySelector('#initiate');

let currentQuestion;
let questionIndex = 0;
let score = 0;

let userAnswers = new Array(questionBank.length).fill(null);


// to create the question element and the answer elements and the controls element
// question element
let questionElement = document.createElement('div');
questionElement.classList.add('questionElement');

// answer element
let answerElement = document.createElement('div');
answerElement.classList.add('answerElement');

// controls element
let controlsElement = document.createElement('div');
controlsElement.classList.add('controlsElement')

// in the controls element, we have the navigation element
let navigationElement = document.createElement('div')
navigationElement.classList.add('navigationElement')
controlsElement.appendChild(navigationElement)

const previousButton = document.createElement('button');
previousButton.classList.add('previousButton');
previousButton.innerText = '\u2190';
navigationElement.appendChild(previousButton);

const nextButton = document.createElement('button');
nextButton.classList.add('nextButton');
nextButton.innerText = `\u2192`;
navigationElement.appendChild(nextButton)

const submitButton = document.createElement('button')
submitButton.classList.add('submitBtn');
submitButton.innerText = `\u21b5`;
controlsElement.appendChild(submitButton)
submitButton.style.display = 'none';

// to display the questions
function generateQuestion() {
    questionElement.innerHTML = '';
    answerElement.innerHTML = '';
    controlsElement.style.display = '';
    currentQuestion = questionBank[questionIndex];

    // generating the question
    let questionStatement = document.createElement('p');
    questionStatement.innerText = `${questionIndex + 1}. ${currentQuestion.question}`;
    questionElement.appendChild(questionStatement);
    questionStatement.classList.add('questionStatement')

    // to generate the options
    for(let key in currentQuestion){
        if(key.startsWith('option')){
            const option = document.createElement('input')
            option.type = 'radio';
            option.name = 'options';
            option.id = key;
            option.value = key;
            option.classList.add('options')

            option.addEventListener('change', e => {
                userAnswers[questionIndex] = e.target.value;
                if (questionIndex < questionBank.length - 1) {
                    nextButton.disabled = false;
                }
            })
            
            let label = document.createElement('label');
            label.setAttribute('for', key);
            label.innerText = currentQuestion[key];
            label.classList.add('optionsText');
            label.appendChild(option)
            answerElement.appendChild(label);
        }
    }

    const selectedOption = userAnswers[questionIndex];
    if(selectedOption !== null) {
        let selectedAnswer = answerElement.querySelector(`input[value="${selectedOption}"]`)
        if(selectedAnswer) {
            selectedAnswer.checked = true;
        }
    }

    // disabling the buttons
    previousButton.disabled = questionIndex === 0;
    if(questionIndex === questionBank.length - 1) {
        nextButton.setAttribute('disabled', 'true');
        submitButton.style.display = 'block';
    } else {
        nextButton.disabled = (userAnswers[questionIndex] === null);
        submitButton.style.display = 'none';
    }
}

// for the controls element
function previousQuestion() {
    if(questionIndex >= 0) {
        questionIndex--;
        generateQuestion();
    }
}
function nextQuestion() {
    if(questionIndex < questionBank.length - 1) {
        questionIndex++;
        generateQuestion();
    }
}

// handles the restart quiz 
function restartQuiz() {
    score = 0;
    questionIndex = 0;
    userAnswers.fill(null);

    const existingScoreDisplay = quizContainer.querySelector('.scoreDisplay');
    if(existingScoreDisplay) {
        existingScoreDisplay.remove();
    }

    const existingRestartBtn = quizContainer.querySelector('.restartBtn');
    if (existingRestartBtn) {
        existingRestartBtn.remove();
    }

    questionElement.style.display = 'none';
    answerElement.style.display = 'none';
    controlsElement.style.display = 'none';
    startQuizBtn.style.display = 'block';   
    startQuizBtn.disabled = false;
}

// adding event listeners to the buttons
previousButton.addEventListener('click', previousQuestion)
nextButton.addEventListener('click', nextQuestion)

// the submit button here
submitButton.addEventListener('click', () => {
    score = 0;
    for(let i = 0; i < questionBank.length; i++) {
        if(userAnswers[i] === questionBank[i].answer) {
            score++;
        }
    }

    questionElement.style.display = 'none';
    answerElement.style.display = 'none';
    controlsElement.style.display = 'none';

    let scoreDisplay = document.createElement('div')
    scoreDisplay.classList.add('scoreDisplay')
    scoreDisplay.innerText = `You scored ${score} / ${questionBank.length} questions`;

    quizContainer.appendChild(scoreDisplay) ;

    const restartButton = document.createElement('button');
    restartButton.classList.add('restartBtn');
    restartButton.innerText = 'Restart Quiz';
    quizContainer.appendChild(restartButton);
    restartButton.addEventListener('click', restartQuiz)
})

// to start the quiz logic and its event
function startQuiz(){
    // questionElement.style.display = 'block';
    // answerElement.style.display = 'block';
    // controlsElement.style.display = 'block';    
    
    quizContainer.appendChild(questionElement)
    quizContainer.appendChild(answerElement)
    quizContainer.appendChild(controlsElement)

    if(questionElement.style.display = 'none') {
        questionElement.style.display = 'block'
    }
    if(answerElement.style.display = 'none') {
        answerElement.style.display = 'flex'
    }
    
    generateQuestion();
    startQuizBtn.setAttribute('disabled', 'true');
    startQuizBtn.style.display = 'none';
}

startQuizBtn.addEventListener('click', startQuiz)

console.log(userAnswers);