let currentQuestion = 0;
const questions = document.querySelectorAll('.question');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');

// Initialize the character scores
const characters = {
  usui: 0,
  kazehaya: 0,
  otani: 0,
  kou: 0,
  ryu: 0,
  haru: 0,
  miyamura: 0,
  zen: 0,
  naruse: 0,
};

nextButton.addEventListener('click', () => {
  // Check if the current question has been answered
  const currentQuestionElement = questions[currentQuestion];
  const radioButtons = currentQuestionElement.querySelectorAll('input[type="radio"]');
  let answered = false;
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      answered = true;
    }
  });

  if (answered) {
    // Get the user's answer
    const answerElement = currentQuestionElement.querySelector('input[name="answer"]:checked');
    const points = JSON.parse(answerElement.dataset.points);
    Object.keys(points).forEach((character) => {
      characters[character] += points[character];
    });

    // Hide the current question and show the next one
    currentQuestionElement.style.display = 'none';
    currentQuestion++;
    if (currentQuestion < questions.length) {
      questions[currentQuestion].style.display = 'block';
    } else {
      // If all questions have been answered, hide the next button
      nextButton.style.display = 'none';

      // Get the closest character
      const closestCharacter = getClosestCharacter();

      // Display the results
      displayResults(closestCharacter);
    }
  } else {
    // If the current question hasn't been answered, alert the user
    alert('Please answer the current question before proceeding.');
  }
});

function getClosestCharacter() {
  return Object.keys(characters).reduce((a, b) => characters[a] > characters[b] ? a : b);
}

function displayResults(closestCharacter) {
  resultElement.innerHTML = `You are most like ${closestCharacter}.`;
  resultElement.classList.add('show');
}