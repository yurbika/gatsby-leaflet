import React, { useState } from "react"
import YouTube from "react-youtube"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

//components
import WithSpinner from "../../components/with-spinner/with-spinner.component"

//redux
import { selectIsFetching } from "../../redux/map/map.selectors"

import { setVideoIsPlaying } from "../../redux/video/video.actions"

//styles
import "./video.styles.scss"
import * as Styled from "./video.styles"

const YoutubeWithSpinner = WithSpinner(YouTube)

const Video = ({
  h1: title,
  id,
  km,
  videoLength,
  description,
  date,
  isLoading,
  setIsPlaying,
}) => {
  const [expand, setExpand] = useState(false)
  let interval = null
  const getCurTimeInterval = e => {
    interval = setInterval(
      () => console.log(e.target.getMediaReferenceTime()),
      1000
    )
  }
  var PAUSE_EVT_STACK = 0

  function onPlayerStateChange(event) {
    if (event.data == 3) PAUSE_EVT_STACK++
    if (event.data == 1) PAUSE_EVT_STACK = 0

    if (event.data == 2 && PAUSE_EVT_STACK <= 1) console.log("Pause pressed")
    else if (event.data == 2 && PAUSE_EVT_STACK > 1) {
      console.log("Tracking occuring")
      console.log("Hey! Dont fast forward during my ad you douche")
    }
    console.log(event.data)
  }
  return (
    <Styled.Container>
      <Styled.EmbedContainer>
        <YoutubeWithSpinner
          isLoading={isLoading}
          videoId={id[0]}
          className="embed-container__iframe"
          onPlay={e => {
            getCurTimeInterval(e)
            setIsPlaying()
          }}
          onPause={() => {
            if (PAUSE_EVT_STACK <= 1) {
              clearInterval(interval)
              setIsPlaying()
            }
          }}
          onEnd={() => {
            clearInterval(interval)
            setIsPlaying()
          }}
          onStateChange={e => onPlayerStateChange.bind(e)}
        />
      </Styled.EmbedContainer>
      <Styled.InfoBox>
        <h2>{title}</h2>
        <Styled.InfoBox__Description expand={expand}>
          {description}
        </Styled.InfoBox__Description>
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
        <Styled.Button onClick={() => setExpand(!expand)}>
          <span>{expand ? "VIEW LESS" : "VIEW MORE"}</span>
        </Styled.Button>
      </Styled.InfoBox>
    </Styled.Container>
  )
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetching,
})

const mapDispatchToProps = dispatch => ({
  setIsPlaying: () => dispatch(setVideoIsPlaying()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Video)
