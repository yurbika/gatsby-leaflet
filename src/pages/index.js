import React from "react"

import Layout from "../components/layout"
import Map from "../components/map/map.component"
import VideoContainer from "../components/video-container/video-container.component"

const IndexPage = () => (
  <Layout>
    <Map />
    <VideoContainer />
  </Layout>
)

export default IndexPage
