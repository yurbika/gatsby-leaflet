import React from "react"
import YouTube from "react-youtube"

//styles
import "./video.styles.scss"

const Video = ({ h1: title, id, km, videoLength, description, date }) => {
  const _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  console.log(title, id)
  return (
    <article className="container">
      <YouTube videoId={id[0]} onReady={_onReady} className="video" />
      <section className="info-box">
        <h2>{title}</h2>
        <p className="info-box__description">{description}</p>
        <ul>
          <li>KM: {!!km ? km : "-"}</li>
          <li>Duration: {videoLength}</li>
          <li>Date: {date}</li>
        </ul>
      </section>
    </article>
  )
}

export default Video
