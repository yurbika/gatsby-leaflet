import React, { useState } from "react"
import YouTube from "react-youtube"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

//components
import WithSpinner from "../../components/with-spinner/with-spinner.component"

//redux
import { selectIsFetching } from "../../redux/map/map.selectors"

import {
  setVideoIsPlaying,
  setVideoLatLngs,
  setVideoCurTime,
  setVideoTotalLength,
} from "../../redux/video/video.actions"
import { selectIsPlaying } from "../../redux/video/video.selectors"

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
  latlngs,
  isLoading,
  setIsPlaying,
  isPlaying,
  setVideoLatLngs,
  setVideoCurTime,
  setVideoTotalLength,
}) => {
  const [expand, setExpand] = useState(false)
  return (
    <Styled.Container>
      <Styled.EmbedContainer>
        <YoutubeWithSpinner
          isLoading={isLoading}
          videoId={id[0]}
          className="embed-container__iframe"
          onPlay={e => {
            setVideoCurTime(e.target.getCurrentTime() * 1000)
            setVideoTotalLength(videoLength)
            setIsPlaying(e.data === 1)
            setVideoLatLngs(latlngs)
          }}
          onPause={e => {
            setIsPlaying(!(e.data === 2))
          }}
          onEnd={e => {
            setIsPlaying(!(e.data === 0))
          }}
          onPlaybackRateChange={e => console.log(e)}
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
  setVideoLatLngs: array => dispatch(setVideoLatLngs(array)),
  setVideoCurTime: time => dispatch(setVideoCurTime(time)),
  setVideoTotalLength: time => dispatch(setVideoTotalLength(time)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Video)
