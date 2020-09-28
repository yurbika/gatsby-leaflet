import React from "react"

//components
import Map from "../map/map.component"
import VideoContainer from "../video-container/video-container.component"

//styles
import "./map-page-container.styles.scss"

const MapPageContainer = () => {
  return (
    <article>
      <VideoContainer />
      <Map />
    </article>
  )
}

export default MapPageContainer
