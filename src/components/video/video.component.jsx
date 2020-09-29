import React from "react"
import YouTube from "react-youtube"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

//components
import WithSpinner from "../../components/with-spinner/with-spinner.component"

//redux
import { selectIsFetching } from "../../redux/map/map.selectors"

//styles
import "./video.styles.scss"

const YoutubeWithSpinner = WithSpinner(YouTube)

const Video = ({
  h1: title,
  id,
  km,
  videoLength,
  description,
  date,
  isLoading,
}) => {
  const _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }
  return (
    <article className="container">
      <div className="embed-container">
        <YoutubeWithSpinner
          isLoading={isLoading}
          videoId={id[0]}
          onReady={_onReady}
          className="embed-container__iframe"
        />
      </div>
      <section className="info-box">
        <h2>{title}</h2>
        <pre className="info-box__description">{description}</pre>
        <ul>
          <li>
            <b>KM:</b> {!!km ? km : "-"}
          </li>
          <li>
            <b>Duration:</b> {videoLength}
          </li>
          <li>
            <b>Date:</b> {date}
          </li>
        </ul>
      </section>
    </article>
  )
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetching,
})

export default connect(mapStateToProps)(Video)
