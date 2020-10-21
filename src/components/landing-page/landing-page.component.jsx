import React from "react"

//components
import Video from "./video/video.component"

//styles
import "./landing-page.styles.scss"

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <Video />
      <div className="width-container">
        <article className="reason-section">
          <h2>Japan is a beautiful country, but ...</h2>
        </article>
      </div>
    </div>
  )
}

export default LandingPage
