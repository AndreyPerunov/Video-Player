import React, { useCallback, useEffect, useState } from "react"
import ReactDOM from "react-dom/client"

import "./styles/main.scss"

// Components
import VideoPlayer from "./components/VideoPlayer"
import Cards from "./components/Cards"

function Main() {
  const [outside, setOutside] = useState(false)

  return (
    <>
      <div className={`${outside ? "container-outside" : "container"}`}>
        <div className="video">
          <VideoPlayer setOutside={setOutside} />
        </div>
        <div className="Card">
          <Cards amount="12" modifier="green" />
        </div>
        <div className="RightCard">
          <Cards amount="8" />
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
