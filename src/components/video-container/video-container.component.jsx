import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import isEqual from "lodash.isequal"

//component
import Video from "../video/video.component"
import PageChanger from "./page-changer/page-changer.component"

//redux
import {
  selectVideos,
  selectZoom,
  selectCurMapTarget,
} from "../../redux/map/map.selectors"
import { clearVideos } from "../../redux/map/map.actions"

//assets
import Kitty from "../../assets/kitty.svg"

//utils
import ID_GENERATOR from "../../uniqueKey"

//styles
import * as Styled from "./video-container.styles"

class VideoContainer extends React.Component {
  state = {
    videos: this.props.videos,
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.videos, state.videos) && props.zoom >= 8) {
      return {
        videos: props.videos,
      }
    } else if (props.zoom < 8) return { videos: [] }
    return null
  }

  componentDidUpdate() {
    this.myRef.scroll(0, 0)
  }

  render() {
    return (
      <Styled.Container ref={ref => (this.myRef = ref)}>
        {this.state.videos.map((data, idx) => (
          <Video
            {...data}
            selected={
              !!this.props.curMapTarget &&
              idx === 0 &&
              data.title ===
                this.props.curMapTarget["_additionalInformation"].match(
                  /(?<=<h2>)(.*)(?=<\/h2>)/gm
                )[0]
            }
            key={ID_GENERATOR("video-")}
          />
        ))}
        {this.state.videos.length === 0 ? (
          <Styled.Help>
            <ul>
              <li>
                <h2>Help</h2>
              </li>
              <li>Zoom in to explorer</li>
              <li>Click on a region to focus</li>
              <li>Click on a route to focus</li>
              <li>Start a video to enable live routing</li>
              <li>A video must be paused to continue exploring</li>
              <li>
                Beware the live routing is not 100% synchronous with the video
              </li>
              <li>
                Hovering a region/route displayes the name at the right top
                corner
              </li>
            </ul>
            <Kitty />
          </Styled.Help>
        ) : (
          <PageChanger forwardRef={this.myRef} />
        )}
      </Styled.Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  videos: selectVideos,
  zoom: selectZoom,
  curMapTarget: selectCurMapTarget,
})

const mapDispatchToProps = dispatch => ({
  clearVideos: () => dispatch(clearVideos()),
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer)
