// creating the main variables 
let questionBank = [
    {
        question: 'The this keyword always refers to the global object.',
        option1: 'True',
        option2: 'False',
        answer: 'option2'
    },
    {
        question: 'The parseInt function can convert a string to an integer.',
        option1: 'True',
        option2: 'False',
        answer: 'opiton1'
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
        option3: '15',
        option4: '105',
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

// to create the question element and the answer elements and the controls element
// question element
let questionElement = document.createElement('div');
questionElement.classList.add('question-element');

// answer element
let answerElement = document.createElement('div');
answerElement.classList.add('answer-element');

// controls element
let controlsElement = document.createElement('div');
controlsElement.classList.add('controls')

// in the controls element, we have the navigation element
let navigationElement = document.createElement('div')
navigationElement.classList.add('navigation-element')
controlsElement.appendChild(navigationElement)

const previousButton = document.createElement('button');
previousButton.classList.add('previous-button');
previousButton.innerText = '\u2190';
navigationElement.appendChild(previousButton);

const nextButton = document.createElement('button');
nextButton.classList.add('next-button');
nextButton.innerText = `\u2192`;
navigationElement.appendChild(nextButton)

const submitButton = document.createElement('button')
submitButton.classList.add('submit-btn');
submitButton.innerText = `\u21b5`;
controlsElement.appendChild(submitButton)
submitButton.style.display = 'none';

// to display the questions
function generateQuestion() {
    questionElement.innerHTML = '';
    answerElement.innerHTML = '';

    nextButton.disabled = true;
    
    currentQuestion = questionBank[questionIndex];

    // to generate the question number, trying out some new things
    let questionStatement = document.createElement('p');
    questionStatement.innerText = `${questionIndex + 1}. ${currentQuestion.question}`;

    questionElement.appendChild(questionStatement);
    

    // to generate the options
    for(let key in currentQuestion){
        if(key.startsWith('option')){
            const option = document.createElement('input')
            option.type = 'radio';
            option.name = 'options';
            option.id = key;
            option.value = key;
            
            const label = document.createElement('label');
            label.setAttribute('for', key);
            label.innerText = currentQuestion[key];

            label.appendChild(option)
            answerElement.appendChild(label);
        }
    }

    // when to disable the previous button
    previousButton.disabled = questionIndex === 0;
    // when to disble the next button
    if(questionIndex === questionBank.length - 1) {
        nextButton.setAttribute('disabled', 'true');
        submitButton.style.display = 'block'
    } else {
        nextButton.removeAttribute('disabled');
        submitButton.style.display = 'none';
    }
}

// functions for each of the controls element
// for previous questions
function previousQuestion() {
    if(questionIndex >= 0) {
        questionIndex--;
        generateQuestion();
    }
}
// for next questions
function nextQuestion() {
    if(questionIndex < questionBank.length - 1) {
        questionIndex++;
        generateQuestion();
    }
}
// adding event listeners to the buttons
previousButton.addEventListener('click', previousQuestion)
nextButton.addEventListener('click', nextQuestion)





// to start the quiz logic and its event
function startQuiz(){
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(answerElement);
    quizContainer.appendChild(controlsElement);
    
    generateQuestion()

    startQuizBtn.setAttribute('disabled', 'true');
    startQuizBtn.style.display = 'none';
}
startQuizBtn.addEventListener('click', startQuiz)