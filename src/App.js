import React from "react"
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"

export default function App() {
  const [start, setStart] = React.useState(false) 

  return (
    <main>
      {start ?
        <Quiz /> :
        <Intro setStart={setStart} />
      }
    </main>
  )
}