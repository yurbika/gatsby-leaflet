import React from "react"
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
  setVideoID,
  setVideoPlaybackRate,
} from "../../redux/video/video.actions"
import { selectVideoID } from "../../redux/video/video.selectors"

//styles
import * as Styled from "./video.styles"

const YoutubeWithSpinner = WithSpinner(YouTube)

class Video extends React.Component {
  state = {
    expand: false,
  }
  componentDidUpdate() {
    if (this.props.curVideoID !== this.props.id[0] && this.video)
      this.video.internalPlayer.stopVideo()
  }
  render() {
    const {
      h1: title,
      id,
      km,
      videoLength,
      videoLengthMS,
      description,
      date,
      latlngs,
      isLoading,
      setIsPlaying,
      setVideoLatLngs,
      setVideoCurTime,
      setVideoTotalLength,
      setVideoID,
      setVideoPlaybackRate,
    } = this.props
    return (
      <Styled.Container>
        <Styled.EmbedContainer>
          <YoutubeWithSpinner
            videoId={id[0]}
            isLoading={isLoading}
            className="embed-container__iframe"
            onPlay={e => {
              setVideoCurTime(e.target.getCurrentTime() * 1000)
              setVideoTotalLength(videoLengthMS)
              setIsPlaying(e.data === 1)
              setVideoLatLngs(latlngs)
              setVideoID(id[0])
            }}
            onPause={e => {
              setIsPlaying(!(e.data === 2))
            }}
            onEnd={e => {
              setIsPlaying(!(e.data === 0))
            }}
            onPlaybackRateChange={e => setVideoPlaybackRate(e.data)}
            innerRef={video => (this.video = video)}
          />
        </Styled.EmbedContainer>
        <Styled.InfoBox>
          <h2>{title}</h2>
          <Styled.InfoBox__Description expand={this.state.expand}>
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
          <Styled.Button
            onClick={() => this.setState({ expand: !this.state.expand })}
          >
            <span>{this.state.expand ? "VIEW LESS" : "VIEW MORE"}</span>
          </Styled.Button>
        </Styled.InfoBox>
      </Styled.Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetching,
  curVideoID: selectVideoID,
})

const mapDispatchToProps = dispatch => ({
  setIsPlaying: isPlaying => dispatch(setVideoIsPlaying(isPlaying)),
  setVideoLatLngs: array => dispatch(setVideoLatLngs(array)),
  setVideoCurTime: time => dispatch(setVideoCurTime(time)),
  setVideoTotalLength: time => dispatch(setVideoTotalLength(time)),
  setVideoID: id => dispatch(setVideoID(id)),
  setVideoPlaybackRate: num => dispatch(setVideoPlaybackRate(num)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Video)
