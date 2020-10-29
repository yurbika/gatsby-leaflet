import React from "react"
import { Link } from "gatsby"

//assets
import Trailer from "../../../assets/trailer.mp4"

//styles
import * as Styled from "./video.styles"

const Video = () => {
  return (
    <Styled.VideoSection>
      <video autoPlay loop muted playsInline>
        <source src={Trailer} type="video/mp4" />
        Your browser does not support playing this Video
      </video>
      <Styled.Overlay />
      <Styled.HeadingGroup>
        <h1>Japan from a Different Perspective</h1>
        <h2>Let me take you to places in Japan you have never seen before.</h2>
      </Styled.HeadingGroup>
      <Link to="/map">
        <Styled.LinkBackground />
        EXPLORE JAPAN
      </Link>
      <Styled.Line />
    </Styled.VideoSection>
  )
}

export default Video
