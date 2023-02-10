import React from "react"
import ReactDOM from "react-dom/client"

import "./styles/main.scss"

function Main() {
  return <></>
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
