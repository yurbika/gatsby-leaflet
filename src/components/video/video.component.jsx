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
import {
  selectVideoID,
  selectIsPlaying,
} from "../../redux/video/video.selectors"

import { selectMapRef, selectCurMapTarget } from "../../redux/map/map.selectors"
import { setCurMapTarget } from "../../redux/map/map.actions"

//utils
import { createPolyline, deletePolyline } from "./utils/utils"
import { checkStrings } from "../video-container/utils/utils"

//styles
import * as Styled from "./video.styles"

const YoutubeWithSpinner = WithSpinner(YouTube)

class Video extends React.Component {
  constructor() {
    super()

    this.state = {
      expand: false,
      ready: false,
    }
  }
  componentDidUpdate() {
    //preventing simultaneously playing of videos
    if (
      this.props.curVideoID !== "" &&
      !checkStrings(this.props.curVideoID, this.props.id[0]) &&
      this.video &&
      this.props.isPlaying
    )
      this.video.internalPlayer.stopVideo()
  }

  render() {
    const {
      //styling prop
      selected,
      //passed data
      title,
      id,
      km,
      videoLength,
      videoLengthMS,
      description,
      date,
      latlngs,
      target,
      //needed for polyline animation
      setIsPlaying,
      setVideoLatLngs,
      setVideoCurTime,
      setVideoTotalLength,
      setVideoID,
      setVideoPlaybackRate,
      //needed for foucs on map
      setCurMapTarget,
      curMapTarget,
      //general redux
      map,
      isPlaying,
      isLoading,
    } = this.props
    if (curMapTarget === null) deletePolyline(map)
    return (
      <Styled.Container selected={selected}>
        <Styled.EmbedContainer>
          <YoutubeWithSpinner
            onReady={() => this.setState({ ready: true })}
            videoId={id[0]}
            isLoading={isLoading && !this.state.ready}
            className="embed-container__iframe"
            onPlay={e => {
              if (this.state.ready) {
                setVideoCurTime(e.target.getCurrentTime() * 1000)
                setVideoTotalLength(videoLengthMS)
                setIsPlaying(e.data === 1)
                setVideoLatLngs(latlngs)
                setVideoID(id[0])
              }
            }}
            onPause={e => {
              setIsPlaying(!(e.data === 2))
              setVideoID("")
            }}
            onEnd={e => {
              setIsPlaying(!(e.data === 0))
              setVideoID("")
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
          <Styled.ButtonContainer>
            <Styled.Button
              onClick={() => this.setState({ expand: !this.state.expand })}
            >
              <span>{this.state.expand ? "VIEW LESS" : "VIEW MORE"}</span>
            </Styled.Button>
            <Styled.Button
              fullBorder
              onClick={() => {
                map.fitBounds(latlngs)
                if (!isPlaying) {
                  createPolyline(latlngs, map)
                  setCurMapTarget(target)
                }
              }}
            >
              <span>VIEW ON MAP</span>
            </Styled.Button>
          </Styled.ButtonContainer>
        </Styled.InfoBox>
      </Styled.Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetching,
  curVideoID: selectVideoID,
  map: selectMapRef,
  curMapTarget: selectCurMapTarget,
  isPlaying: selectIsPlaying,
})

const mapDispatchToProps = dispatch => ({
  setIsPlaying: isPlaying => dispatch(setVideoIsPlaying(isPlaying)),
  setVideoLatLngs: array => dispatch(setVideoLatLngs(array)),
  setVideoCurTime: time => dispatch(setVideoCurTime(time)),
  setVideoTotalLength: time => dispatch(setVideoTotalLength(time)),
  setVideoID: id => dispatch(setVideoID(id)),
  setVideoPlaybackRate: num => dispatch(setVideoPlaybackRate(num)),
  setCurMapTarget: obj => dispatch(setCurMapTarget(obj)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Video)
