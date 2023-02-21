import React from "react"
import ReactDOM from "react-dom/client"

import "./styles/main.scss"

// Components
import VideoPlayer from "./components/VideoPlayer"
import Cards from "./components/Cards"

function Main() {
  return (
    <>
      <div className="theater">{/* <VideoPlayer /> */}</div>
      <div className="wrapper">
        <div className="row row--gutters">
          <div className="row__large-9">
            <VideoPlayer />
            <Cards amount="2" modifier="green" />
          </div>
          <div className="row__large-3">
            <Cards amount="8" />
          </div>
        </div>
      </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
