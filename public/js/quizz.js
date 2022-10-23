function quizzStart() {
  if (sessionStorage.getItem("loggedUser") == undefined)
    location.replace("/*")
  var Category = document.getElementById("title");
  Category.textContent = JSON.parse(sessionStorage.getItem('Category')).category;

  fetch("http://localhost:3000/dataHintButton/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
    .then(resp => resp.json())
    .then(resp => {
      const p = document.getElementById('hint-count')
      p.textContent = resp[0].hintcount
    })
  fetch("http://localhost:3000/dataquizz/" + Category.textContent + "/" + JSON.parse(sessionStorage.getItem('Category')).dificulty)
    .then(resp => resp.json())
    .then(resp => {
      const startButton = document.getElementById('start-btn')
      const nextButton = document.getElementById('next-btn')
      const finishButton = document.getElementById('finish-btn')
      const hintButton = document.getElementById('hint-btn')
      const questionContainerElement = document.getElementById('question-container')
      const questionElement = document.getElementById('question')
      const answerButtonsElement = document.getElementById('answer-buttons')
      const p = document.getElementById('results')
      const p2 = document.getElementById('hint-count')

      let shuffledQuestions, currentQuestionIndex
      let cnt = 0

      startButton.addEventListener('click', startGame)
      nextButton.addEventListener('click', () => {
        currentQuestionIndex++
        hintButton.disabled = false;
        setNextQuestion()
      })
      finishButton.addEventListener('click', () => {
        location.replace("/userpage");
      })
      hintButton.addEventListener('click', () => {

        if (parseInt(document.getElementById('hint-count').textContent) <= 0) {
          alert("no hint buttons available")
        }
        else {
          var x = 0;
          var nr = 0
          while (nr < 2) {

            x = Math.floor(Math.random() * 4);
            var answer = document.getElementById(x)
            if (shuffledQuestions[currentQuestionIndex].answers[x].correct == 0 && !answer.classList.contains('checked')) {
              nr += 1
              var answer = document.getElementById(x)
              answer.classList.add('visible', 'checked')
              console.log(x, answer)
            }
          }
          const p = document.getElementById('hint-count')
          var x = parseInt(p.textContent) - 1
          fetch("http://localhost:3000/updatedataHintButton/" + x + "/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId, {
            method: 'PUT'
          })
            .then(resp2 => resp2.json())
            .then(resp2 => {
            })

          fetch("http://localhost:3000/dataHintButton/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
            .then(resp => resp.json())
            .then(resp => {
              console.log(resp[0].hintcount)
              p.textContent = resp[0].hintcount
            })

          hintButton.disabled = true;
        }

      })




      function startGame() {
        startButton.classList.add('hide')
        shuffledQuestions = resp.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        shuffledQuestions[currentQuestionIndex].answers = shuffledQuestions[currentQuestionIndex].answers.sort(() => Math.random() - .5)
        questionContainerElement.classList.remove('hide')
        hintButton.classList.remove('hide')
        p2.classList.remove('hide')
        setNextQuestion()
      }

      function setNextQuestion() {
        resetState()
        shuffledQuestions[currentQuestionIndex].answers = shuffledQuestions[currentQuestionIndex].answers.sort(() => Math.random() - .5)
        showQuestion(shuffledQuestions[currentQuestionIndex])
      }

      function showQuestion(question) {
        questionElement.innerText = question.question
        var nr = 0
        question.answers.forEach(answer => {
          const button = document.createElement('button')
          button.innerText = answer.text
          button.classList.add('btn', 'ansbtn')
          button.id = nr
          if (answer.correct) {
            button.dataset.correct = answer.correct
          }
          button.addEventListener('click', selectAnswer, { once: true })
          answerButtonsElement.appendChild(button)
          nr++
        })
      }

      function resetState() {
        clearStatusClass(document.body)
        nextButton.classList.add('hide')
        while (answerButtonsElement.firstChild) {
          answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        }
      }

      function selectAnswer(e) {

        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        setStatusClass(document.body, correct)
        setStatusClass(selectedButton, correct)
        if (correct == 1)
          cnt++
        Array.from(answerButtonsElement.children).forEach(button => {
          button.removeEventListener('click', selectAnswer)
          if (button.dataset.correct == 1)
            setStatusClass(button, button.dataset.correct)
        })
        if (5 > currentQuestionIndex + 1) {
          nextButton.classList.remove('hide')
          hintButton.disabled = true;
        } else {
          // startButton.innerText = 'Restart'
          // startButton.classList.remove('hide')
          p.textContent = "ati raspuns corect la " + cnt + "/5 întrebări!";
          p.classList.remove('hide');

          finishButton.classList.remove('hide')
          fetch('http://localhost:3000/dataPlayer/' + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
            .then(resp => resp.json())
            .then(resp => {
              console.log(resp)
              resp[0].Experience = resp[0].Experience + 15*cnt + 3*(5- cnt);
              if (resp[0].Experience >= resp[0].ExperienceCap) {
                resp[0].Experience = resp[0].Experience - resp[0].ExperienceCap
                resp[0].ExperienceCap = resp[0].ExperienceCap + 0.2*resp[0].ExperienceCap
                resp[0].PlayerLevel = resp[0].PlayerLevel + 1
              }
              fetch('http://localhost:3000/updatedataPlayer/' + resp[0].PlayerLevel + "/" + resp[0].ExperienceCap + "/" + resp[0].Experience + "/" + resp[0].idPlayer, {
                method: 'PUT'
              })
                .then(resp1 => resp1.json())
                .then(resp1 => {
                })
              var currentdate = new Date();
              if ((currentdate.getMonth() + 1) < 10)
                var QDate = currentdate.getDate() + "-"
                  + "0" + (currentdate.getMonth() + 1) + "-"
                  + currentdate.getFullYear();
              else
                var QDate = currentdate.getDate() + "-"
                  + (currentdate.getMonth() + 1) + "-"
                  + currentdate.getFullYear();
              var QTime = currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
              var QCorrect = cnt;
              var QNumber = 5;
              fetch('http://localhost:3000/updateHistory/' + QDate + "/" + QTime + "/" + QCorrect + "/" + QNumber + "/" + Category.textContent, { method: 'PUT' })
                .then(resp2 => resp2.json())
                .then(resp2 => {
                })
              fetch('http://localhost:3000/dataHistory/' + QDate + "/" + QTime)
                .then(resp3 => resp3.json())
                .then(resp3 => {
                  console.log(resp3[0].idHistory);
                  fetch('http://localhost:3000/updateStatistics/' + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId + "/" + resp3[0].idHistory, { method: 'PUT' })
                    .then(resp4 => resp4.json())
                    .then(resp4 => {

                    })
                })
            })
        }
      }

      function setStatusClass(element, correct) {
        clearStatusClass(element)
        if (correct) {
          element.classList.add('correct')
        } else {
          element.classList.add('wrong')
        }
      }

      function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
      }
    })
}










function DailyStart() {
  if (sessionStorage.getItem("loggedUser") == undefined)
    location.replace("/*")
  var Category = document.getElementById("title");
  Category.textContent = sessionStorage.getItem('Daily');

  fetch("http://localhost:3000/dataHintButton/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
    .then(resp => resp.json())
    .then(resp => {
      const p = document.getElementById('hint-count')
      p.textContent = resp[0].hintcount
    })

  fetch("http://localhost:3000/dataDailyQuizz")
    .then(resp => resp.json())
    .then(resp => {
      const startButton = document.getElementById('start-btn')
      const nextButton = document.getElementById('next-btn')
      const finishButton = document.getElementById('finish-btn')
      const hintButton = document.getElementById('hint-btn')
      const questionContainerElement = document.getElementById('question-container')
      const questionElement = document.getElementById('question')
      const answerButtonsElement = document.getElementById('answer-buttons')
      const p = document.getElementById('results')
      const p2 = document.getElementById('hint-count')

      let shuffledQuestions, currentQuestionIndex
      let cnt = 0

      startButton.addEventListener('click', startGame)
      nextButton.addEventListener('click', () => {
        currentQuestionIndex++
        hintButton.disabled = false;
        setNextQuestion()
      })
      finishButton.addEventListener('click', () => {
        sessionStorage.removeItem("Daily")
        location.replace("/userpage");
      })
      hintButton.addEventListener('click', () => {

        if (parseInt(document.getElementById('hint-count').textContent) <= 0) {
          alert("no hint buttons available")
        }
        else {
          var x = 0;
          var nr = 0
          while (nr < 2) {

            x = Math.floor(Math.random() * 4);
            var answer = document.getElementById(x)
            if (shuffledQuestions[currentQuestionIndex].answers[x].correct == 0 && !answer.classList.contains('checked')) {
              nr += 1
              var answer = document.getElementById(x)
              answer.classList.add('visible', 'checked')
              console.log(x, answer)
            }
          }
          const p = document.getElementById('hint-count')
          var x = parseInt(p.textContent) - 1
          fetch("http://localhost:3000/updatedataHintButton/" + x + "/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId, {
            method: 'PUT'
          })
            .then(resp2 => resp2.json())
            .then(resp2 => {
            })

          fetch("http://localhost:3000/dataHintButton/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
            .then(resp => resp.json())
            .then(resp => {
              console.log(resp[0].hintcount)
              p.textContent = resp[0].hintcount
            })

          hintButton.disabled = true;
        }

      })





      function startGame() {
        startButton.classList.add('hide')
        shuffledQuestions = resp.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        shuffledQuestions[currentQuestionIndex].answers = shuffledQuestions[currentQuestionIndex].answers.sort(() => Math.random() - .5)
        questionContainerElement.classList.remove('hide')
        hintButton.classList.remove('hide')
        p2.classList.remove('hide')
        setNextQuestion()
      }

      function setNextQuestion() {
        resetState()
        shuffledQuestions[currentQuestionIndex].answers = shuffledQuestions[currentQuestionIndex].answers.sort(() => Math.random() - .5)
        showQuestion(shuffledQuestions[currentQuestionIndex])
      }

      function showQuestion(question) {
        questionElement.innerText = question.question
        var nr = 0
        question.answers.forEach(answer => {
          const button = document.createElement('button')
          button.innerText = answer.text
          button.classList.add('btn', 'ansbtn')
          button.id = nr
          if (answer.correct) {
            button.dataset.correct = answer.correct
          }
          button.addEventListener('click', selectAnswer, { once: true })
          answerButtonsElement.appendChild(button)
          nr++
        })
      }

      function resetState() {
        clearStatusClass(document.body)
        nextButton.classList.add('hide')
        while (answerButtonsElement.firstChild) {
          answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        }
      }

      function selectAnswer(e) {

        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        setStatusClass(document.body, correct)
        setStatusClass(selectedButton, correct)
        if (correct == 1)
          cnt++
        Array.from(answerButtonsElement.children).forEach(button => {
          button.removeEventListener('click', selectAnswer)
          if (button.dataset.correct == 1)
            setStatusClass(button, button.dataset.correct)
        })
        if (10 > currentQuestionIndex + 1) {
          nextButton.classList.remove('hide')
          hintButton.disabled = true;
        } else {
          // startButton.innerText = 'Restart'
          // startButton.classList.remove('hide')
          p.textContent = "ati raspuns corect la " + cnt + "/10 întrebări!";
          p.classList.remove('hide');

          finishButton.classList.remove('hide')
          fetch("http://localhost:3000/dataHintButton/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
            .then(resp => resp.json())
            .then(resp => {
              var x = resp[0].hintcount + Math.floor(cnt/3)
              console.log(x)
              fetch("http://localhost:3000/updatedataHintButton/" + x + "/" + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId, {
              method: 'PUT'
              })
              .then(resp2 => resp2.json())
              .then(resp2 => {
              })
          })
          
          fetch('http://localhost:3000/dataPlayer/' + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)
            .then(resp => resp.json())
            .then(resp => {
              resp[0].Experience = resp[0].Experience + cnt * 10 + 2*(10-cnt)
              if (resp[0].Experience >= resp[0].ExperienceCap) {
                resp[0].Experience = resp[0].Experience - resp[0].ExperienceCap
                resp[0].ExperienceCap = resp[0].ExperienceCap + 0.2*resp[0].ExperienceCap
                resp[0].PlayerLevel = resp[0].PlayerLevel + 1
              }
              fetch('http://localhost:3000/updatedataPlayer/' + resp[0].PlayerLevel + "/" + resp[0].ExperienceCap + "/" + resp[0].Experience + "/" + resp[0].idPlayer, {
                method: 'PUT'
              })
                .then(resp1 => resp1.json())
                .then(resp1 => {
                })
              var currentdate = new Date();

              if ((currentdate.getMonth() + 1) < 10) {
                var QDate = currentdate.getDate() + "-"
                  + "0" + (currentdate.getMonth() + 1) + "-"
                  + currentdate.getFullYear();
              }
              else {
                var QDate = currentdate.getDate() + "-"
                  + (currentdate.getMonth() + 1) + "-"
                  + currentdate.getFullYear();
              }
              var QTime = currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
              var QCorrect = cnt;
              var QNumber = 10;
              // console.log(typeof String(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId))
              localStorage.setItem(String(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId), JSON.stringify({ day: String(currentdate.getDate()+1), month: String(currentdate.getMonth()), year: String(currentdate.getFullYear()), hours: String(currentdate.getHours()), minutes: String(currentdate.getMinutes()), seconds: String(currentdate.getSeconds()) }
              ))
              console.log(localStorage.getItem(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId))
              fetch('http://localhost:3000/updateHistory/' + QDate + "/" + QTime+"/"+QCorrect+"/"+ QNumber+"/"+ Category.textContent, {method:'PUT'})
              .then(resp2 => resp2.json())
              .then(resp2 =>{
              })
              fetch('http://localhost:3000/dataHistory/' + QDate + "/" + QTime)
                .then(resp3 => resp3.json())
                .then(resp3 => {
                  console.log(resp3[0].idHistory);
                  fetch('http://localhost:3000/updateStatistics/' + JSON.parse(sessionStorage.getItem("loggedUser")).loggedId +"/"+ resp3[0].idHistory,{method:'PUT'})
                  .then(resp4 => resp4.json())
                  .then(resp4 =>{

                  })
                })
            })
        }
      }

      function setStatusClass(element, correct) {
        clearStatusClass(element)
        if (correct) {
          element.classList.add('correct')
        } else {
          element.classList.add('wrong')
        }
      }

      function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
      }
    })
}

function manageQuiz() {
  console.log(sessionStorage.getItem("Daily"))
  if (sessionStorage.getItem('Daily') != undefined)
    DailyStart();
  else
    quizzStart();
}

manageQuiz();

// function managequizz(){
//   if(JSON.parse(sessionStorage.getItem("Category")).dificulty == "easy")
//     quizzStartEasy();
//   if(JSON.parse(sessionStorage.getItem("Category")).dificulty == "medium")
//     quizzStartMedium();
//   if(JSON.parse(sessionStorage.getItem("Category")).dificulty == "hard")
//     quizzStartHard();
// }

// managequizz();
const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Dev Ed', correct: true },
      { text: 'Fun Fun Function', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]