import React from "react"
import YouTube from "react-youtube"

const Video = ({ videoId }) => {
  const _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }
  console.log(videoId)
  return <YouTube videoId={videoId} onReady={_onReady} />
}

export default Video
