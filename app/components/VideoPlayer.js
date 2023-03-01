import React, { useCallback, useEffect, useRef, useState } from "react"
import Spinner from "./Spinner"

function VideoPlayer({ setOutside }) {
  const video = useRef(null)
  const timelineContainer = useRef(null)
  const previewImg = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isTheaterMode, setIsTheaterMode] = useState(false)

  const onKeyDown = useCallback(
    e => {
      if (!video.current) return
      // 75 - k
      // 32 - space bar
      if (e.keyCode == 75 || e.keyCode == 32) {
        e.preventDefault()
        toggleVideo()
      }
      // 84 - t
      if (e.keyCode === 84) {
        toggleIsTheater()
      }
      // 70 - f
      if (e.keyCode === 70) {
        toggleIsFullScreen()
      }
    },
    [isTheaterMode, isPlaying, isFullScreen]
  )

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onKeyDown])

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  }, [onMouseMove])

  useEffect(() => {
    if (isTheaterMode || isFullScreen) setOutside(true)
    else setOutside(false)
  }, [isTheaterMode, isFullScreen])

  useEffect(() => {
    if (!video.current) return

    const onPlay = () => {
      if (isWaiting) setIsWaiting(false)
      setIsPlaying(true)
    }

    const onPause = () => {
      if (isWaiting) setIsWaiting(false)
      setIsPlaying(false)
    }

    const onWaiting = () => {
      if (isPlaying) setIsWaiting(false)
      setIsWaiting(true)
    }

    const videoElement = video.current

    const onTimeUpdate = () => {
      setIsWaiting(false)
      if (!timelineContainer.current) return
      const { currentTime, duration } = videoElement
      const progress = currentTime / duration
      timelineContainer.current.style.setProperty("--progress-position", progress)
    }

    const onProgress = () => {
      if (!videoElement.buffered.length || !timelineContainer.current) return
      const { duration, buffered } = videoElement
      const bufferedEnd = buffered.end(buffered.length - 1)
      if (timelineContainer && duration > 0) {
        const buffer = bufferedEnd / duration
        timelineContainer.current.style.setProperty("--buffer-position", buffer)
      }
    }

    videoElement.addEventListener("play", onPlay)
    videoElement.addEventListener("playing", onPlay)
    videoElement.addEventListener("pause", onPause)
    videoElement.addEventListener("waiting", onWaiting)
    videoElement.addEventListener("timeupdate", onTimeUpdate)
    videoElement.addEventListener("progress", onProgress)

    return () => {
      videoElement.removeEventListener("play", onPlay)
      videoElement.removeEventListener("playing", onPlay)
      videoElement.removeEventListener("pause", onPause)
      videoElement.removeEventListener("waiting", onWaiting)
      videoElement.removeEventListener("timeupdate", onTimeUpdate)
      videoElement.removeEventListener("progress", onProgress)
    }
  }, [video.current])

  function seekToPosition(e) {
    if (!video.current) return
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const clickPos = (e.clientX - left) / width
    if (clickPos < 0 || clickPos > 1) return

    // const durationMs = video.current.duration * 1000 // Duration in ms

    // const newElapsedTimeMs = durationMs * clickPos
    // const newTimeSec = newElapsedTimeMs / 1000
    video.current.currentTime = video.current.duration * clickPos // newTimeSec
  }

  function onMouseMove(e) {
    if (!video.current) return
    const { width, left } = timelineContainer.current.getBoundingClientRect()
    const mousePos = (e.x - left) / width
    if (mousePos >= 0 && mousePos <= 1) {
      const previewImgNumber = Math.floor(mousePos * 20) + 1
      previewImg.current.src = `./assets/previewImages/preview${previewImgNumber}.jpg`
      timelineContainer.current.style.setProperty("--preview-position", mousePos)
    }
  }

  function toggleVideo() {
    if (!video.current) return
    if (isPlaying) video.current.pause()
    else video.current.play()
  }

  function toggleIsTheater() {
    if (!video.current) return
    if (!isTheaterMode) setIsFullScreen(false)
    setIsTheaterMode(!isTheaterMode)
    console.log({ isTheaterMode })
  }

  function toggleIsFullScreen() {
    if (!video.current) return
    if (!isFullScreen) setIsTheaterMode(false)
    setIsFullScreen(!isFullScreen)
    console.log({ isFullScreen })
  }

  return (
    <div className={"video-container " + (isPlaying ? "" : "video-container--paused ") + (isTheaterMode ? "video-container--theater " : "") + (isFullScreen ? "video-container--full-screen " : "")}>
      {isWaiting && <Spinner />}
      <video onClick={toggleVideo} ref={video} src="./assets/cute-cat.mp4" controlsList="nodownload"></video>
      <img className="thumbnail-img" />
      <div className="video-container__controls">
        <div ref={timelineContainer} className="video-container__controls__timeline-container">
          <div className="video-container__controls__timeline-container__timeline" onClick={seekToPosition}>
            <img ref={previewImg} className="video-container__controls__timeline-container__timeline__preview-img" />
            <div className="video-container__controls__timeline-container__timeline__thumb-indicator"></div>
            <div className="video-container__controls__timeline-container__timeline__buffer"></div>
          </div>
        </div>
        <div className="video-container__controls__buttons">
          <button onClick={toggleVideo} className="video-container__controls__buttons__play-pause-btn">
            <svg className="video-container__controls__buttons__play-pause-btn__play-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg className="video-container__controls__buttons__play-pause-btn__pause-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
          <button className="video-container__controls__buttons__mini-player-btn">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z" />
            </svg>
          </button>
          <button onClick={toggleIsTheater} className="video-container__controls__buttons__theater-btn">
            <svg className="video-container__controls__buttons__theater-btn__tall" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" />
            </svg>
            <svg className="video-container__controls__buttons__theater-btn__wide" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z" />
            </svg>
          </button>
          <button onClick={toggleIsFullScreen} className="video-container__controls__buttons__full-screen-btn">
            <svg className="video-container__controls__buttons__full-screen-btn__open" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
            <svg className="video-container__controls__buttons__full-screen-btn__close" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
