import React from "react"

export default function Quiz() {
  const [quizItems, setQuizItems] = React.useState([])
  const [score, setScore] = React.useState(0)

  React.useEffect(() => {
    if (!score) {
      fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple&encode=base64")
      .then(res => res.json())
      .then(data => {
        setQuizItems(data.results.map(item => (
          {
            question: item.question,
            answers: randomizeOptions([
              item.correct_answer,
              ...item.incorrect_answers
            ]),
            correct_answer: item.correct_answer,
            selected_answer: "",
          }
        )))
      })
    }
  }, [score])

  function randomizeOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options
  }

  function sellectOption(event) {
    const {name, value} = event.target
    setQuizItems(oldQuizItems => oldQuizItems.map(item => {
      return {
        ...item,
        selected_answer: item.question === name ? value : item.selected_answer
      }
    }))
  }

  function checkAnswer(item, option) {
    if (score) {
      if (option === item.correct_answer) {
        return "correct"
      } else if (option === item.selected_answer) {
        return "incorrect"
      }
      else {
        return ""
      }
    } else if (item.selected_answer === option){
      return "selected"
    } else {
      return ""
    }
  }

  function checkAnswers(event) {
    event.preventDefault()
    setScore(`${quizItems.filter(item => item.selected_answer === item.correct_answer).length}`)
  }

  function restart() {
    setScore(0)
  }

  return (
    <form className="quiz" onSubmit={checkAnswers}>
      {quizItems.map(item => (
        <div className="quiz-item">
          <p className="quiz-item-question">{atob(item.question)}</p>
          <div className="quiz-item-answers">
            {item.answers.map(option => (
              <div className="quiz-item-answers--option">
                <input
                  type="radio"
                  id={`${item.question}${option}`}
                  name={item.question}
                  value={option}
                  checked={item.selected_answer === option}
                  onChange={sellectOption}
                />
                <label
                  className={`quiz-item-answers--option-label ${checkAnswer(item, option)}`}
                  htmlFor={`${item.question}${option}`}
                  style={score ? {} : {opacity: 1}}
                >
                  {atob(option)}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      {score ?
        <div className="bottom">
          <p className="bottom-score">You scored {score}/5 correct answers</p>
          <button type="button" className="bottom-btn" onClick={restart}>Play again</button>
        </div>
        :
        <div className="result">
          <button className="bottom-btn">Check answers</button>
        </div>
      }
    </form>
  )
}