const STORE = [
  {
    question: 'Which placement is most closely linked with your authentic personality and who you see yourself as?',
    answers: [
      'Moon',
      'Sun',
      'Rising',
      'Venus'
    ],
    correctAnswer:
      'Moon',

    answerImage: "<img src='images/appollo11.jpg' alt='Man's first steps on the moon' class='answerImages'>",
    },

    {
    question:
      'Which Mars placement is most likely to get in a fight?',
    answers: [
      'Leo',
      'Cancer',
      'Virgo',
      'Aries'
    ],
    
    answerImage: '<img src="images/aries.jpg" alt="Image of a ram" class="answerImages">',
    
    correctAnswer:
    'Aries'
  },
  
  {
    question:
      'What is the proper name for the rising sign?',
    answers: [
      'Predominant',
      'Ascendent',
      'Descendent',
      'Prevailing',

    ],
    
    answerImage: '<img src="images/zodiac.jpg" alt="Zodiac wheel" class="answerImages">',
    
    
    correctAnswer:
    'Ascendent'
  },
  
  {
    question: 'Which element is Aquarius associated with?',
    answers: [
      'Earth',
      'Air',
      'Fire',
      'Water'
    ],
    
    answerImage: '<img src="images/elements.jpg" alt="Image of the four basic elements in water glasses" class="answerImages">',
    
    correctAnswer:
    'Air'
  },
  {
    question:
      'Which planet rules how you communicate and process information?',
    answers: [
      'Pluto',
      'Venus',
      'Saturn',
      'Mercury'
    ],
    
    answerImage: '<img src="images/mercury.jpg" alt="NASA image of Mercury" class="answerImages">',
    
    correctAnswer: 'Mercury'
  }
];

//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//function to generate each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createThing(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(5);
  }
}

//increments the number value of the score variable 
//and updates the "score" text
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the number value of the questionNumber
//and updates the "question number" text
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the value of "question number" and "score" 
//and updates their respective text
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//begins the quiz
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.mainBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="resize" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit </button>`).appendTo(fieldSelector);
  return formMaker;
}

//runs if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.response').html(
    `<h3>Correct!</h3>
      <p class="resize">${STORE[questionNumber].correctAnswer}</p>
      <p class="resize">${STORE[questionNumber].answerImage}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//runs if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>Incorrect!</h3>
    <p class="resize">${STORE[questionNumber].correctAnswer}</p>
    <p class="resize">${STORE[questionNumber].answerImage}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates next question
function nextQuestion() {
  $('.mainBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

//determines final score
function finalScore() {
  $('.final').show();
    return $('.final').html(
    `<h3>Your score is ${score} / 5</h3>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to restart quiz
function restartQuiz() {
  $('.mainBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
