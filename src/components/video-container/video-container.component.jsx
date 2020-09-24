import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

//redux
import { selectRoutes } from "../../redux/map/map.selectors"

//utils
import { getData } from "./utils/utils"

class VideoContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      videos: null,
    }
  }
  componentDidMount() {
    let arr = this.getVideos()
    this.setState({ videos: arr })
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.routes &&
      this.props.routes &&
      this.props.routes.cur !== prevProps.routes.cur
    ) {
      let arr = this.getVideos()
      this.setState({ videos: arr })
    }
  }

  getVideos = () => {
    if (this.props.routes !== null && this.props.routes.cur) {
      return getData(this.props.routes.cur)
    }
  }

  render() {
    console.log(this.state.videos)
    return <div></div>
  }
}

const mapStateToProps = createStructuredSelector({
  routes: selectRoutes,
})

export default connect(mapStateToProps)(VideoContainer)
