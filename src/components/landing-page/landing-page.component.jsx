import React from "react"

//components
import Video from "./video/video.component"
import Reasons from "./reasons/reasons.component"
import Membership from "./membership/membership.component"
import About from "./about/about.component"

//styles
import * as Styled from "./landing-page.styles"
import { Line } from "./video/video.styles"

const LandingPage = () => {
  return (
    <Styled.Container>
      <Video />
      <Styled.Content>
        <Line reverse />
        <Reasons />
        <Styled.HLine />
        <Membership />
        <Styled.HLine />
        <About />
      </Styled.Content>
    </Styled.Container>
  )
}

export default LandingPage
