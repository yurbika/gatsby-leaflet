import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

//redux
import { selectRoutes } from "../../redux/map/map.selectors"

//utils
import { getData } from "./utils/utils"

class VideoContainer extends React.Component {
  componentDidMount() {
    let videos = null
    if (this.props.routes !== null && this.props.routes.cur) {
      videos = getData(this.props.routes.cur)
    }
    console.log(videos)
  }
  componentDidUpdate() {
    let videos = null
    if (this.props.routes !== null && this.props.routes.cur) {
      videos = getData(this.props.routes.cur)
    }
  }

  render() {
    return <div></div>
  }
}

const mapStateToProps = createStructuredSelector({
  routes: selectRoutes,
})

export default connect(mapStateToProps)(VideoContainer)
