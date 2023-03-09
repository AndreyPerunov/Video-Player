import React, { useCallback, useEffect, useRef, useState } from "react"
import Spinner from "./Spinner"
import TimeTracker from "./TimeTracker"

function VideoPlayer({ setOutside }) {
  const isInitialMount = useRef(true)
  const video = useRef(null)
  const videoContainer = useRef(null)
  const timelineContainer = useRef(null)
  const previewImg = useRef(null)
  const thumbnailImg = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [isScrubbing, setIsScrubbing] = useState(false)
  const [wasPaused, setWasPaused] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isTheaterMode, setIsTheaterMode] = useState(false)
  const [isMiniPlayer, setIsMiniPlayer] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState("high")
  const [volume, setVolume] = useState(1)
  const [durationTime, setDurationTime] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  const onKeyDown = useCallback(
    e => {
      const tagName = document.activeElement.tagName.toLowerCase()
      if (!video.current || tagName === "input") return
      switch (e.key.toLowerCase()) {
        case " ":
          if (tagName === "button") return
          e.preventDefault()
          toggleVideo()
          break
        case "k":
          toggleVideo()
          break
        case "t":
          toggleIsTheater()
          break
        case "f":
          toggleIsFullScreen()
          return
        case "i":
          toggleIsMiniPlayer()
          return
        case "m":
          toggleMute()
          return
        case "arrowleft":
          skip(-5)
          return
        case "j":
          skip(-10)
          return
        case "arrowright":
          skip(5)
          return
        case "l":
          skip(10)
          return
        case "arrowup":
          e.preventDefault()
          addVolume(0.05)
          return
        case "arrowdown":
          e.preventDefault()
          addVolume(-0.05)
          return
      }
    },
    [isTheaterMode, isPlaying, isFullScreen, isMiniPlayer]
  )

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onKeyDown])

  useEffect(() => {
    timelineContainer.current.addEventListener("mousemove", onMouseMoveTimeline)
    return () => timelineContainer.current.removeEventListener("mousemove", onMouseMoveTimeline)
  }, [onMouseMoveTimeline])

  useEffect(() => {
    timelineContainer.current.addEventListener("mousedown", toggleIsScrubbing)
    return () => timelineContainer.current.removeEventListener("mousedown", toggleIsScrubbing)
  }, [toggleIsScrubbing])

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp)
    return () => document.removeEventListener("mouseup", onMouseUp)
  }, [onMouseUp])

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  }, [onMouseMove])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      let e = window.event
      if (isScrubbing) {
        setWasPaused(!video.current.paused)
        video.current.pause()
      } else {
        const { width, left } = timelineContainer.current.getBoundingClientRect()
        const mousePos = (e.x - left) / width
        video.current.currentTime = video.current.duration * mousePos
        if (wasPaused) video.current.play()
      }
    }
  }, [isScrubbing])

  useEffect(() => {
    if (isTheaterMode || isFullScreen) setOutside(true)
    else setOutside(false)
  }, [isTheaterMode, isFullScreen])

  useEffect(() => {
    if (!video.current) return
    video.current.muted = volume == 0
    if (volume > 1) setVolume(1)
    if (volume < 0) setVolume(0)
    if (volume > 0 && volume <= 1) video.current.volume = volume
  }, [volume])

  useEffect(() => {
    if (!video.current) return
    if (playbackRate === video.current.playbackRate) return
    video.current.playbackRate = playbackRate
  }, [playbackRate])

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
      setElapsedTime(currentTime)
      timelineContainer.current.style.setProperty("--progress-position", progress)
    }

    const onDurationchange = () => {
      setDurationTime(videoElement.duration)
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

    const onVolumeChange = () => {
      setVolume(videoElement.volume)
      if (videoElement.volume >= 0.5) setVolumeLevel("high")
      if (videoElement.volume < 0.5 && videoElement.volume > 0) setVolumeLevel("low")
      if (videoElement.volume == 0 || videoElement.muted) {
        setVolumeLevel("muted")
        setVolume(0)
      }
    }

    videoElement.addEventListener("play", onPlay)
    videoElement.addEventListener("playing", onPlay)
    videoElement.addEventListener("pause", onPause)
    videoElement.addEventListener("waiting", onWaiting)
    videoElement.addEventListener("timeupdate", onTimeUpdate)
    videoElement.addEventListener("durationchange", onDurationchange)
    videoElement.addEventListener("progress", onProgress)
    videoElement.addEventListener("volumechange", onVolumeChange)

    return () => {
      videoElement.removeEventListener("play", onPlay)
      videoElement.removeEventListener("playing", onPlay)
      videoElement.removeEventListener("pause", onPause)
      videoElement.removeEventListener("waiting", onWaiting)
      videoElement.removeEventListener("timeupdate", onTimeUpdate)
      videoElement.removeEventListener("durationchange", onDurationchange)
      videoElement.removeEventListener("progress", onProgress)
      videoElement.removeEventListener("volumechange", onVolumeChange)
    }
  }, [video.current])

  function seekToPosition(e) {
    if (!video.current) return
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const clickPos = (e.clientX - left) / width
    if (clickPos < 0 || clickPos > 1) return
    video.current.currentTime = video.current.duration * clickPos
  }

  function onMouseMoveTimeline(e) {
    if (!video.current) return
    const { width, left } = timelineContainer.current.getBoundingClientRect()
    const mousePos = (e.x - left) / width
    if (mousePos >= 0 && mousePos <= 1) {
      const previewImgNumber = Math.floor(mousePos * 20) + 1
      previewImg.current.src = `./assets/previewImages/preview${previewImgNumber}.jpg`
      timelineContainer.current.style.setProperty("--preview-position", mousePos)
    }

    if (isScrubbing) {
      e.preventDefault()
      thumbnailImg.current.src = previewImg.current.src
      timelineContainer.current.style.setProperty("--progress-position", mousePos)
    }
  }

  function toggleIsScrubbing(e) {
    setIsScrubbing(e.buttons === 1)
    onMouseMoveTimeline(e)
  }

  function onMouseUp(e) {
    if (isScrubbing) toggleIsScrubbing(e)
  }

  function onMouseMove(e) {
    if (isScrubbing) toggleIsScrubbing(e)
  }

  function toggleVideo() {
    if (!video.current) return
    if (isPlaying) video.current.pause()
    else video.current.play()
  }

  function toggleIsTheater() {
    if (!video.current) return
    if (!isTheaterMode) {
      setIsFullScreen(false)
      setIsMiniPlayer(false)
      isFullScreen ? document.exitFullscreen() : ""
      isMiniPlayer ? document.exitPictureInPicture() : ""
    }
    setIsTheaterMode(!isTheaterMode)
  }

  function toggleIsMiniPlayer() {
    if (!video.current) return
    if (!isMiniPlayer) {
      setIsTheaterMode(false)
      setIsFullScreen(false)
      isFullScreen ? document.exitFullscreen() : ""
    }
    setIsMiniPlayer(!isMiniPlayer)
    if (!isMiniPlayer) video.current.requestPictureInPicture()
    else document.exitPictureInPicture()
  }

  function toggleIsFullScreen() {
    if (!video.current) return
    if (!isFullScreen) {
      setIsTheaterMode(false)
      setIsMiniPlayer(false)
      isMiniPlayer ? document.exitPictureInPicture() : ""
    }
    setIsFullScreen(!isFullScreen)
    if (document.fullscreenElement == null) videoContainer.current.requestFullscreen()
    else document.exitFullscreen()
  }

  function skip(skipTime) {
    if (!video.current) return
    video.current.currentTime += skipTime
  }

  function addVolume(amount) {
    if (!video.current) return
    setVolume(prevVolume => prevVolume + amount)
  }

  function changePlaybackSpeed() {
    if (playbackRate === 2) setPlaybackRate(0.25)
    else setPlaybackRate(playbackRate + 0.25)
  }

  function toggleMute() {
    if (!video.current) return
    video.current.muted = !video.current.muted
  }

  return (
    <div ref={videoContainer} className={"video-container " + (isPlaying ? "" : "video-container--paused ") + (isTheaterMode ? "video-container--theater " : "") + (isFullScreen ? "video-container--full-screen " : "") + (isMiniPlayer ? "video-container--mini-player " : "") + (isScrubbing ? "video-container--scrubbing " : "")} data-volume-level={volumeLevel}>
      {isWaiting && <Spinner />}
      <video onClick={toggleVideo} ref={video} src="./assets/cute-cat.mp4" controlsList="nodownload"></video>
      <img ref={thumbnailImg} className="video-container__thumbnail-img" />
      <div className="video-container__controls">
        {/* TIME-LINE */}
        <div ref={timelineContainer} className="video-container__controls__timeline-container">
          <div className="video-container__controls__timeline-container__timeline" onClick={seekToPosition}>
            <img ref={previewImg} className="video-container__controls__timeline-container__timeline__preview-img" />
            <div className="video-container__controls__timeline-container__timeline__buffer"></div>
            <div className="video-container__controls__timeline-container__timeline__thumb-indicator"></div>
          </div>
        </div>
        <div className="video-container__controls__buttons">
          {/* PLAY-PAUSE */}
          <button onClick={toggleVideo} className="video-container__controls__buttons__play-pause-btn">
            <svg className="video-container__controls__buttons__play-pause-btn__play-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg className="video-container__controls__buttons__play-pause-btn__pause-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
          {/* VOLUME */}
          <div className="video-container__controls__buttons__volume-container">
            <button onClick={toggleMute} className="video-container__controls__buttons__volume-container__mute-btn">
              <svg className="video-container__controls__buttons__volume-container__mute-btn__volume-high-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
              </svg>
              <svg className="video-container__controls__buttons__volume-container__mute-btn__volume-low-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
              </svg>
              <svg className="video-container__controls__buttons__volume-container__mute-btn__volume-muted-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
              </svg>
            </button>
            <input onChange={e => setVolume(e.target.value)} className="video-container__controls__buttons__volume-container__volume-slider" type="range" min="0" max="1" step="any" value={volume} />
          </div>
          {/* TIME-TRACKER */}
          <TimeTracker elapsedTime={elapsedTime} durationTime={durationTime} />
          {/* SPEED */}
          <button onClick={changePlaybackSpeed} className="video-container__controls__buttons__speed-btn">
            {playbackRate}x
          </button>
          {/* MINI-PLAYER */}
          <button onClick={toggleIsMiniPlayer} className="video-container__controls__buttons__mini-player-btn">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z" />
            </svg>
          </button>
          {/* THEATER-MODE */}
          <button onClick={toggleIsTheater} className="video-container__controls__buttons__theater-btn">
            <svg className="video-container__controls__buttons__theater-btn__tall" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" />
            </svg>
            <svg className="video-container__controls__buttons__theater-btn__wide" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z" />
            </svg>
          </button>
          {/* FULL-SCREEN */}
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
