import React from "react"

//components
import Card from "../card/card.component"

//styles
import * as Styled from "./membership.styles"

const Membership = () => {
  return (
    <Styled.Container>
      <section>
        <h2>Become a member</h2>
        <p>
          I'm baby literally austin subway tile beard aesthetic lomo
          kickstarter. Authentic narwhal art party iPhone raclette. Hexagon
          chicharrones crucifix, succulents hell of kitsch man braid pabst
          snackwave.
        </p>
      </section>
      <Styled.Cards>
        <Card name="COMMUNITY" color="#D3043B" bgColor="#FFEBF0" price="0" />
        <Card
          name="SILVER"
          color="#00B6C8"
          bgColor="#EDFAFF"
          price="0"
          highlight
        />
        <Card name="GOLD" color="#F6B73E" bgColor="#FFF9E1" price="0" />
      </Styled.Cards>
    </Styled.Container>
  )
}

export default Membership
