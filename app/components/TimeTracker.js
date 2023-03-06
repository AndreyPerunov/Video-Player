import React from "react"

function ComponentName({ elapsedTime, durationTime }) {
  const elapsedTimeMin = Math.floor(elapsedTime / 60)
  const elapsedTimeSec = Math.floor(elapsedTime % 60)

  const durationTimeMin = Math.floor(durationTime / 60)
  const durationTimeSec = Math.floor(durationTime % 60)

  return (
    <div className="video-container__controls__buttons__duration-container">
      <div className="video-container__controls__buttons__duration-container__current-time">
        {elapsedTimeMin}:{elapsedTimeSec.toString().padStart(2, "0")}
      </div>
      /
      <div className="video-container__controls__buttons__duration-container__total-time">
        {durationTimeMin}:{durationTimeSec.toString().padStart(2, "0")}
      </div>
    </div>
  )
}

export default ComponentName
