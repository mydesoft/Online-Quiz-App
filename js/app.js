const startBtn = document.getElementById('start-btn')
const quizQuestions = document.getElementById('quiz-questions')
const nextButton = document.getElementById('next-btn')
const answerButtonsRow = document.querySelector('#answer-row')
const endQuizBtn = document.getElementById('end-quiz-btn')
const spinner = document.getElementById('spinner')
const showResultTemplate = document.getElementById('show-result')
const restartBtn = document.getElementById('restart-btn')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')

let currentQuestionIndex = 0
let shuffledQuestion
const storedAnswers = []
let currentSeconds = 60
let currentMinutes = 1


function startQuiz(){
    startBtn.classList.add('d-none')
    quizQuestions.classList.remove('d-none')
    setQuestion()   
    setExamTime()
}

function setQuestion(){
    const question = shuffledQuestion[currentQuestionIndex]
    resetQuestionState()
    showQuestion(question)    
}

function showQuestion(question){
    const questionNumber = document.getElementById('question-number')
    const questionType = document.getElementById('question-type').firstElementChild
    //Set Questions and Options
    questionNumber.innerText = `Question ${currentQuestionIndex + 1}`
    questionType.innerText = question.question  
    // Create Options Buttons
    question.options.forEach((option) => {
        const buttonColumn = document.createElement('div')
        buttonColumn.className = 'form-check'
        const optionButton = document.createElement('input')
        optionButton.setAttribute('type', 'radio')
        optionButton.setAttribute( 'name', 'answer-button')
        optionButton.setAttribute('value', option.option)
        optionButton.className = 'form-check-input'
        const optionButtonText = document.createElement('label')
        optionButtonText.className = 'form-check-label'
        optionButtonText.textContent = option.option
        buttonColumn.append(optionButton, optionButtonText)
        answerButtonsRow.append(buttonColumn)

        //Get the user answer
        optionButton.addEventListener('click', getUserAnswer)
    })

    
}

function setNextQuestion(){
    currentQuestionIndex ++
    if( shuffledQuestion.length === currentQuestionIndex + 1){
        setQuestion()
        nextButton.classList.add('d-none')
    }
    else{
        setQuestion()
    }
}

function resetQuestionState(){
    while(answerButtonsRow.firstChild){
        answerButtonsRow.removeChild(answerButtonsRow.firstChild)
    }
}

function getUserAnswer(event){
    const clickedButton = event.target
    const userAnswer = clickedButton.value
    storedAnswers.forEach((storedAnswer) => {
        if(currentQuestionIndex in storedAnswer){
            storedAnswerIndex = storedAnswers.findIndex((answeredIndex) => {
                console.log(answeredIndex.id)
                 answeredIndex.id === currentQuestionIndex
            })
            storedAnswers.splice(storedAnswerIndex, 1)
        }

    })
    const question = shuffledQuestion[currentQuestionIndex]
    const  correctAnswer = question.Answer
    let score 
    if (correctAnswer === userAnswer) {
       score = 10
    }
    else{
        score = 0
    }
    console.log(correctAnswer)
    console.log(score)

    const userAnswers = {
            [currentQuestionIndex] : currentQuestionIndex,
            id : currentQuestionIndex,
            userAnswer : userAnswer,
            score : score
    }
    storedAnswers.push(userAnswers)
}

function showResult(){
   const totalScore = storedAnswers.reduce((prevScore, currentScore) => {
        return prevScore + currentScore.score
   }, 0)

   quizQuestions.classList.add('d-none')
   spinner.classList.remove('d-none')
   //Show Spinner
   setTimeout(()=>{
        spinner.classList.add('d-none')
        //Show Result
        const congratulations = document.getElementById('congratulations')
        const score =  document.getElementById('score')
        congratulations.innerText = totalScore >= 50 ? `Congratulations!!! 😊` : `Ooops...Sorry you didn't do well 😞`
        score.innerText = `Your Score is ${totalScore}%`
        showResultTemplate.classList.remove('d-none')
   }, 2000)
}
    
function setExamTime(){
    minutes.innerText = 1
    timeInterval = setInterval(() => {
        currentSeconds --
        seconds.innerText = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
        if (currentSeconds === 0) {
            currentMinutes --
            minutes.innerText = currentMinutes < 1 ? `0${currentMinutes}` : currentMinutes
            currentSeconds = 59
            seconds.innerText = `${currentSeconds}`
        }
        if (currentMinutes === 0 && currentSeconds === 1) {
            endQuizBtn.click()
            clearInterval(timeInterval)
        }
    }, 1000)
}

function restartHandler(){
    location.reload()
}

//Event Listeners
startBtn.addEventListener('click', startQuiz)
nextButton.addEventListener('click', setNextQuestion)
endQuizBtn.addEventListener('click', showResult)
restartBtn.addEventListener('click', restartHandler)

//Questions and Answers
const questionBank = [
    {
        question: 'Do you know eating chewing gum while slicing onions can reduce the tears at that moment?',
        options : [
            { option : 'True'},
            {option : 'False'},
            {option : `I'm not sure`},
            {option : 'none'},
            
        ],

        Answer : 'True'
    },
    
    {
        question: 'What is the capital of Mozambique?',
        options : [
            { option : 'Arare'},
            {option : 'Lome'},
            {option : 'Maputo'},
            {option : 'Yaounde'},
            
        ],

        Answer : 'Maputo'
    },

    {
        question: 'How old was Alexander the Great when he died',
        options : [
            { option : '25years '},
            {option : '32years'},
            {option : '18years'},
            {option : '40years'},
            
        ],

        Answer : '32years'
    },

    {
        question: 'Who shot presidenet J.F Kennedy?',
        options: [
            { option : 'Lee Harvey Oswald'},
               {option : 'John Wilkes Booth'},
               {option : 'Bin Laden'},
               {option : 'none'},
               
            ],
            Answer : 'Lee Harvey Oswald'
        },
        
    {
        question: 'The last colonial governor in Nigeria was?',
        options: [
            
            { option : 'Sir James Wilson Robertson'},
            {option : 'Sir Fedrick Luggard'},
            {option : 'Hugh Clifford'},
            {option : 'John Stuart Macpherson'},
            
        ],
        Answer : 'Sir James Wilson Robertson'
    },

    {
        question: 'How many medal did Great Britain won in 2021 Olympics?',
        options: [
            
            { option : '65'},
            {option : '43'},
            {option : '113'},
            {option : '78'},
            
        ],
        Answer : '65'
    },

    {
        question: 'How many rings are in the olympic logo design?',
        options: [
            
            { option : '4'},
            {option : '5'},
            {option : 'none of the above'},
            {option : '6'},
            
        ],
        Answer : '5'
    },

    {
        question: 'The first country to land on space is?',
        options: [
            
            { option : 'Soviet Union'},
            {option : 'China'},
            {option : 'USA'},
            {option : 'Germany'},
            
        ],
        Answer : 'Soviet Union'
    },
    
    {
        question: 'It takes how many minutes to fall from the north pole to earth core?',
        options : [
            {option : '19 minutes'},
            {option : '100 minutes'},
            {option : '2346 minutes'},
            {option : 'I dont know!'},
            
        ], 
        Answer : '19 minutes'
    },
    
    {
        question: 'General Muritala Muhammed was how old when he was assasinated?',
        options: [
            {option : '37'},
            {option : '40'},
            {option : '45'},
            {option : '50'},
            
        ],
        Answer : '37'
    }
]

//Shuffled Questions
shuffledQuestion = questionBank.sort(() =>{
    return Math.random() - 0.5
 })

 
