import React from "react"

//components
import Video from "./video/video.component"

//assets
import JapanBG from "../../assets/japan.svg"

//styles
import "./landing-page.styles.scss"
import * as Styled from "./landing-page.styles"
import { Line } from "./video/video.styles"

const LandingPage = () => {
  return (
    <Styled.Container>
      <Video />
      <div className="width-container">
        <Line reverse />
        <article className="reason-section">
          <JapanBG className="reason-section__background" />
          <h2>Japan is a beautiful country, but ...</h2>
          <p>
            I'm baby literally austin subway tile beard aesthetic lomo
            kickstarter. Authentic narwhal art party iPhone raclette. Hexagon
            chicharrones crucifix, succulents hell of kitsch man braid pabst
            snackwave. Everyday carry pinterest church-key XOXO taiyaki, master
            cleanse mustache cray chillwave meh. Tilde direct trade taiyaki
            shabby chic butcher kogi beard occupy yuccie freegan.
          </p>
        </article>
      </div>
    </Styled.Container>
  )
}

export default LandingPage
