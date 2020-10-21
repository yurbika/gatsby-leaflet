import React from "react"

//components
import Reason from "../reason/reason.component"

//assets
import JapanBG from "../../../assets/japan.svg"

//styles
import * as Styled from "./reasons.styles"

const Reasons = () => {
  return (
    <Styled.Container>
      <JapanBG className="reason-section__background" />
      <h2>Japan is a beautiful country, but ...</h2>
      <p>
        I'm baby literally austin subway tile beard aesthetic lomo kickstarter.
        Authentic narwhal art party iPhone raclette. Hexagon chicharrones
        crucifix, succulents hell of kitsch man braid pabst snackwave. Everyday
        carry pinterest church-key XOXO taiyaki, master cleanse mustache cray
        chillwave meh. Tilde direct trade taiyaki shabby chic butcher kogi beard
        occupy yuccie freegan.
      </p>
      <Reason
        heading={"You are planning a Trip to Japan?"}
        txt={
          "I'm baby literally austin subway tile beard aesthetic lomo kickstarter. Authentic narwhal art party iPhone raclette. Hexagon chicharrones crucifix, succulents hell of kitsch man braid pabst snackwave. Everyday carry pinterest church-key XOXO taiyaki, master cleanse mustache cray chillwave meh."
        }
        color={"#D3043B"}
      />
      <Reason
        heading={"You are planning a Trip to Japan?"}
        txt={
          "I'm baby literally austin subway tile beard aesthetic lomo kickstarter. Authentic narwhal art party iPhone raclette. Hexagon chicharrones crucifix, succulents hell of kitsch man braid pabst snackwave. Everyday carry pinterest church-key XOXO taiyaki, master cleanse mustache cray chillwave meh."
        }
        left
        color={"#00B6C8"}
      />
      <Reason
        heading={"You are planning a Trip to Japan?"}
        txt={
          "I'm baby literally austin subway tile beard aesthetic lomo kickstarter. Authentic narwhal art party iPhone raclette. Hexagon chicharrones crucifix, succulents hell of kitsch man braid pabst snackwave. Everyday carry pinterest church-key XOXO taiyaki, master cleanse mustache cray chillwave meh."
        }
        color={"#F6B73E"}
      />
    </Styled.Container>
  )
}

export default Reasons
