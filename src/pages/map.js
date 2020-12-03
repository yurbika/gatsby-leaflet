import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MapPageContainer from "../components/map-page-container/map-page-container.component"

const SecondPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Map" />
    {typeof window !== `undefined` && <MapPageContainer />}
  </Layout>
)

export default SecondPage
