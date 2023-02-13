import React from "react"
import ReactDOM from "react-dom/client"

import "./styles/main.scss"

// Components
import Page from "./components/Page"
import VideoPlayer from "./components/VideoPlayer"
import Cards from "./components/Cards"

function Main() {
  return (
    <Page title="Video Player">
      <div class="row row--gutters">
        <div class="row__large-9">
          <VideoPlayer />
        </div>
        <div class="row__large-3">
          <Cards />
        </div>
      </div>
    </Page>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
