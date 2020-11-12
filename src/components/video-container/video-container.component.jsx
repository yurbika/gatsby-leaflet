import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import isEqual from "lodash.isequal"

//component
import Video from "../video/video.component"
import PageChanger from "./page-changer/page-changer.component"

//redux
import { selectVideos, selectZoom } from "../../redux/map/map.selectors"
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

  render() {
    return (
      <Styled.Container>
        {this.state.videos.map(data => (
          <Video {...data} key={ID_GENERATOR("video-")} />
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
          <PageChanger />
        )}
      </Styled.Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  videos: selectVideos,
  zoom: selectZoom,
})

const mapDispatchToProps = dispatch => ({
  clearVideos: () => dispatch(clearVideos()),
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer)
