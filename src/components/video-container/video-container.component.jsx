import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import isEqual from "lodash.isequal"

//component
import Video from "../video/video.component"

//redux
import { selectVideos } from "../../redux/map/map.selectors"

//assets
import Kitty from "../../assets/kitty.svg"

//styles
import "./video-container.styles.scss"

class VideoContainer extends React.Component {
  state = {
    videos: this.props.videos,
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.videos, state.videos)) {
      return {
        videos: props.videos,
      }
    }
    return null
  }

  render() {
    return (
      <section className="video-container">
        {this.state.videos.map(data => (
          <Video {...data} />
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
})

export default connect(mapStateToProps)(VideoContainer)
