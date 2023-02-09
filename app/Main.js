import React from "react"
import ReactDOM from "react-dom/client"

import "./styles/main.scss"

function Main() {
  return <h1>THIS IS A TEST!!!</h1>
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
