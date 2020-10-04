import React, { useState } from "react"
import YouTube from "react-youtube"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

//components
import WithSpinner from "../../components/with-spinner/with-spinner.component"

//redux
import { selectIsFetching } from "../../redux/map/map.selectors"

import { setVideoIsPlaying } from "../../redux/video/video.actions"
import { selectIsPlaying } from "../../redux/video/video.selectors"

//styles
import "./video.styles.scss"
import * as Styled from "./video.styles"

const Video = ({
  h1: title,
  id,
  km,
  videoLength,
  description,
  date,
  polyline,
  isLoading,
  setIsPlaying,
  isPlaying,
}) => {
  const [expand, setExpand] = useState(false)
  let interval = null
  const getCurTimeInterval = e => {
    interval = setInterval(
      () => console.log(e.target.getMediaReferenceTime()),
      1000
    )
  }
  const ref = React.createRef()
  return (
    <Styled.Container>
      <Styled.EmbedContainer>
        <WithSpinner
          isLoading={isLoading}
          videoId={id[0]}
          className="embed-container__iframe"
          forwardRef={e => (this.test = e)}
          onPlay={e => {
            clearInterval(interval)
            getCurTimeInterval(e)
            setIsPlaying(e.data === 1)
            console.log(JSON.stringify(polyline))
          }}
          onPause={e => {
            clearInterval(interval)
            setIsPlaying(!(e.data === 2))
          }}
          onEnd={e => {
            clearInterval(interval)
            setIsPlaying(!(e.data === 0))
          }}
          onPlaybackRateChange={e => console.log(e)}
          onStateChange={e => {
            console.log(ref)
            if (e.data === 1 && isPlaying) console.log(ref)
          }}
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
  isPlaying: selectIsPlaying,
})

const mapDispatchToProps = dispatch => ({
  setIsPlaying: isPlaying => dispatch(setVideoIsPlaying(isPlaying)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Video)
