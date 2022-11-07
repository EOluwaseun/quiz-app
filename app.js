const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const questionContainer = document.getElementById('question-container')
const questionElements = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-button')
// console.log(answerButtonElement )

let shuffleQuestions,currenntQuestionIndex ;

// This is when we click the start button
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', ()=>{
    currenntQuestionIndex++;
    setNextQuestion();
})
function startGame() {
    //when ever we click on the start button ,we want it ot be invisible. so we need to hide it
    startButton.classList.add('hide');
    
    // to shuffle our question,we need to sort it
    shuffleQuestions = questions.sort(()=>Math.random() - .5);

    //also setting our currentQuestion to 0 we want to start from the beginning
    currenntQuestionIndex = 0;
    // we are adding question container to the page 
    questionContainer.classList.remove('hide');
    //also this will show us nextQuestion
    setNextQuestion()
}


//this is for setting next question when we click the next button
function setNextQuestion(){
    resetState()
    //this function will show our question rray
    ShowQuestion(shuffleQuestions[currenntQuestionIndex])
}

//  reset state of the button,this will literally remove the existing button and it will only 
//remains our append button


function ShowQuestion (questions){

    questionElements.textContent = questions.question
    // answers for every question 
    //questions is our objects
    questions.answers.forEach(answer =>{
        //we want to create btn for each answers
        const button = document.createElement('button');
        //set the innerText of the button created to answer.text
        button.innerText = answer.text;
        //add class to the button element created
        button.classList.add('btn')
        if(answer.correct){ /* if  answer is correct*/

            //dataset will b added to the btn element,and attribute of correct
            //we just going to set this if the button is correct 
            button.dataset.correct = answer.correct
        }
        // adding eventListenere to the button and take our selectAnswer function()
        // whenvere we click on our button it select our answer 
        button.addEventListener('click', selectAnswer);
        // the append the child we jst created to the existing btn 
        answerButtonElement.append(button)
    })

}
function resetState(){
    nextButton.classList.add('hide')
    //if there is a child inside answerBtnElement remove the first child
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}
//this button to select the answer
function selectAnswer(e){
    // the (e) simply means ,it takes our event in as a parameter
    //meaning the event that happens when wil click on our button\
    const selectedButton = e.target;
    //select anyone that has a dataset of correct
    const correct = selectedButton.dataset.correct
    // set the body and check if it is true or faulse
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    // when ever answer is been selected ,start nextbtn pops up
    console.log(correct)

    if(shuffleQuestions.length > currenntQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }else{
        startButton.innerText ='Restart'
        startButton.classList.remove('hide')
    
    }
    // nextButton.classList.remove('hide')

}


function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}
function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')


}
//shuffle all my question

// questions iniatialising the question to an array
const questions =[
    //first object in the array is the first qustion
    {
        question:'what is 5 + 5 ?',
        answers:[
            //array as our answer,with object
            {text:'4', correct:false},
            {text:'10', correct:true}
        ]
    },
    {
        question:'what is 5 + 3 ?',
        answers:[
            //array as our answer,with object
            {text:'8', correct:true},
            {text:'10', correct:false},
            {text:'88', correct:false},
            {text:'53', correct:false}



        ]
    },
    {
        question:'Is web developement Fun ?',
        answers:[
            //array as our answer,with object
            {text:'NO', correct:false},
            {text:'Maybe', correct:false},
            {text:'YES', correct:true},
            {text:"Don't know", correct:false}



        ]
    },
]
console.log(questions)

