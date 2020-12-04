import React, { useState } from "react"

//components
import Map from "../map/map.component"
import VideoContainer from "../video-container/video-container.component"

//styles
import { Container } from "./mpc.styles"

const MapPageContainer = () => {
  const [show, setShow] = useState(false)

  return (
    <Container show={show}>
      <VideoContainer />
      <Map />
      <button onClick={() => setShow(!show)}>
        {show ? <span>Map</span> : <span>Videos</span>}
      </button>
    </Container>
  )
}

export default MapPageContainer
