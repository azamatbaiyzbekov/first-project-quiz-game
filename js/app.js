//-------------------------Constants-----------------------------//
//List of my questions with correct answer
const questions = [
  {
    question: "Nephelococcygia is the practice of doing what?",
      choice1: "Finding shapes in clouds",
      choice2: "Sleeping with your eyes open",
      choice3: "Breaking glass with your voice",
      choice4: "Sweeming in freezing water",
      answer: 1
  },
  {
    question: "Which insect shorted out an early supercomputer and inspired the term 'computer bug'?",
      choice1: "Moth",
      choice2: "Roach",
      choice3: "Fly",
      choice4: "Japanese beetle",
      answer: 1
  },
  {
    question: "Which of the following men does not have a chemical element named for him?", 
      choice1: "Albert Einstein",
      choice2: "Niels Bohr",
      choice3: "Isaac Newton",
      choice4: "Enrico Fermi",
      answer: 3
  },
  {
    question: "Which First Lady was a ninth-generation descendant of Pocahontas?", 
      choice1: "Helen Taft",
      choice2: "Edith Wilson",
      choice3: "Bess Truman",
      choice4: "Mamie Eisenhower",
      answer: 2
  },
  {
    question: "Which of the following landlocked countries is entirely contained within another country?", 
      choice1: "Lesotho",
      choice2: "Burkina Faso",
      choice3: "Mongolia",
      choice4: "Luxembourg",
      answer: 1
  },
  {
    question: "In which language was the book 'War and Peace' originally written?", 
      choice1: "French",
      choice2: "English",
      choice3: "German",
      choice4: "Russian",
      answer: 4
  },
  {
    question: "Which of these countries was not part of the Soviet Union?", 
    choice1: "Moldova",
    choice2: "Kazakhstan",
    choice3: "Serbia",
    choice4: "Azerbaijan",
    answer: 3
  },
  {
    question: "Who was drafted as Round 1, Pick 3 by Boston Celtics in 2017 NBA Draft?", 
    choice1: "Lonzo Ball",
    choice2: "Luke Kennard",
    choice3: "Josh Jackson",
    choice4: "Jayson Tatum",
    answer: 4
  },
  {
    question: "How many continents are there?", 
    choice1: "3",
    choice2: "7",
    choice3: "1",
    choice4: "20",
    answer: 2
  },
  {
    question: "Which video game system does Sony produce?", 
    choice1: "Xbox",
    choice2: "Atari",
    choice3: "Game Boy",
    choice4: "Playstation",
    answer: 4
  },
];


//--------------------------State variables----------------------//
let currentQuestion = {};
    let takingAnswers = false;
    let score = 0;
    let questionCounter = 0;      //what questions you are on
    let availableQuestions = [];

    const correctAnswer = 1;
    const maxQuestions = 10;

//-------------------------Cached DOM Elements------------------//
const $start = $('#start');                                     //For DOM manipulation i used both jquery and vanilla JS
const $timer = $('#timer');
const $question = $('#question')
const choices = Array.from(document.getElementsByClassName('choice-text'))
const questionCounterText = document.getElementById('questionCounter');
const $score2 = $('#score');
// const $players = $('#players')
// const $instructions = $('#instructions')


//---------------------------Functions--------------------------//

function accessInfo(){
  let playerName = prompt("Please provide your Name");
  alert (playerName);
  document.getElementById('intro').innerText = `Welcome ${playerName}! Read the instructions below before you begin.`
}
accessInfo();


let time = 60;
const setTimer = () => {
    const $timer = setInterval(() => {
        time--;
        console.log('time drop', time);
        if (time === 0) {
          window.location.reload()
          alert(`Time is up. Your score is ${score}. You lost. Click 'ok' to restart the game.`)
        
        setTimer();
        }
        $('#timer').text(`Timer: ${time}s`);                          //Kenny's way of setting up timer. Used our old notes.
    }, 1000);
};

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]  //putting all the questions into new array
  getNewQuestion()

};

getNewQuestion = () => {
  if(score === 8) {
    if(!alert(`Congrats! You win. Your score is ${score}. Click 'ok' to start again.`)){window.location.reload();}             //Googles this way of how to alert messages on screen.
  }if(questionCounter >= maxQuestions) {
    if(!alert(`Your score is ${score}. You lost. Click 'ok' to start again`)){window.location.reload();}
  }
  
  questionCounter++;    // when game started it incroments to 1
  questionCounterText.innerText = questionCounter + "/" + maxQuestions;


  const questionIndex = Math.floor(Math.random() * availableQuestions.length);   //method to get random question 
  currentQuestion = availableQuestions[questionIndex];
  $question.text(currentQuestion.question);

  choices.forEach(choice => {       //itirating through each choices
    const number = choice.dataset['number'];    //here i am getting number from the dataset property
    choice.innerText = currentQuestion['choice' + number];  //this way i getting choice property and data number associated with it.
  });

  availableQuestions.splice(questionIndex, 1); //with splice Method i am getting rid of already displayed question so it wont appear again

  takingAnswers = true; //alowing users to answer

};

choices.forEach(choice => {    //grabbing each choice again
  choice.addEventListener('click', event => {    //click event
    if(!takingAnswers) return;    // if not accepting answer we just gonna ignore that user clicked

    takingAnswers = false; 
    const pickedChoice = event.target;
    const pickedAnswer = pickedChoice.dataset['number'];

    const classToApply = pickedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'  //based on user choice we are applying class of correct or incorrect. Googled this technique.
    
    if(classToApply === 'correct') {
      adScore(correctAnswer);
    }

    pickedChoice.parentElement.classList.add(classToApply)     //passing classToApply into HTML

    setTimeout( () => {                                       // built in js function that give us delay option between our answer choices.
      pickedChoice.parentElement.classList.remove(classToApply);  //
      getNewQuestion();
    }, 1000);


    })
})

  adScore = num => {
  score += num;
  $score2.text(score);

}

startGame();    //passing on the function to make the game work.



//----------------------------Event Listeners------------------/
$start.on('click', setTimer);
$start.on('submit', startGame);


