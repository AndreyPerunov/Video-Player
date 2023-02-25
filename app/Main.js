import React, { useCallback, useEffect, useState } from "react"
import ReactDOM from "react-dom/client"

import "./styles/main.scss"

// Components
import VideoPlayer from "./components/VideoPlayer"
import Cards from "./components/Cards"

function Main() {
  const [theaterMode, setTheaterMode] = useState(false)

  const handleTheaterModeToggle = () => {
    console.log(theaterMode)
    setTheaterMode(!theaterMode)
  }

  const checkKeyPress = useCallback(
    e => {
      const { keyCode } = e
      if (keyCode === 84) {
        setTheaterMode(!theaterMode)
      }
    },
    [theaterMode]
  )

  useEffect(() => {
    document.addEventListener("keydown", checkKeyPress)
    return () => document.addEventListener("keydown", checkKeyPress)
  }, [checkKeyPress])

  return (
    <>
      <div className={`${theaterMode ? "container-theater-mode" : "container"}`}>
        <div className="video">
          <VideoPlayer toggleThreaterMode={handleTheaterModeToggle} />
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
