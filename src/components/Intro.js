import React from "react"

export default function Intro(props) {
  function startQuiz() {
    props.setStart(true)
  }

  return (
    <section className="intro">
      <h1 className="intro-title">Quizzical</h1>
      <button className="intro-start-btn" onClick={startQuiz}>Start quiz</button>
    </section>
  )
}