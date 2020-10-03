import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import isEqual from "lodash.isequal"

//component
import Video from "../video/video.component"

//redux
import { selectVideos, selectZoom } from "../../redux/map/map.selectors"
import { clearVideos } from "../../redux/map/map.actions"

//assets
import Kitty from "../../assets/kitty.svg"

//utils
import ID_GENERATOR from "../../uniqueKey"

//styles
import "./video-container.styles.scss"

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
      <section className="video-container">
        {this.state.videos.map(data => (
          <Video {...data} key={ID_GENERATOR("video-")} />
        ))}
        {this.state.videos.length === 0 ? (
          <div className="placeholder-container">
            <Kitty className="placeholder-container__svg" />
          </div>
        ) : null}
      </section>
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
