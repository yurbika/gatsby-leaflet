import React from "react"

//components
import Map from "../map/map.component"
import VideoContainer from "../video-container/video-container.component"

//styles
import { Container } from "./mpc.styles"

const MapPageContainer = () => {
  return (
    <Container>
      <VideoContainer />
      <Map />
    </Container>
  )
}

export default MapPageContainer
