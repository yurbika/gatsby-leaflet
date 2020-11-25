import React from "react"

import Layout from "../components/layout"
import MapPageContainer from "../components/map-page-container/map-page-container.component"

const SecondPage = ({ location }) => (
  <Layout location={location}>
    {typeof window !== `undefined` && <MapPageContainer />}
  </Layout>
)

export default SecondPage
