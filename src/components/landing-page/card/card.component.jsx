import React from "react"
import { Link } from "gatsby"

//styles
import * as Styled from "./card.styles"

const Card = ({ color, bgColor, name, price }) => {
  return (
    <Styled.Container>
      <Styled.PriceContainer color={color}>
        <span>{name}</span>
        <Styled.Price>
          <span>$</span>
          <span>{price}</span>
        </Styled.Price>
        <span>Free forever</span>
      </Styled.PriceContainer>
      {/*  */}
      <Styled.Features color={bgColor}>
        <ul>
          <Styled.Li visible>Feature</Styled.Li>
          <Styled.Li visible>Feature</Styled.Li>
          <Styled.Li visible={name === "GOLD" || name === "SILVER"}>
            Feature
          </Styled.Li>
          <Styled.Li visible={name === "GOLD" || name === "SILVER"}>
            Feature
          </Styled.Li>
          <Styled.Li visible={name === "GOLD" || name === "SILVER"}>
            Feature
          </Styled.Li>
          <Styled.Li test={name === "GOLD"}>Feature</Styled.Li>
          <Styled.Li visible={name === "GOLD"}>Feature</Styled.Li>
        </ul>
        <Styled.A to="/map" color={color}>
          Get Started
        </Styled.A>
      </Styled.Features>
    </Styled.Container>
  )
}

export default Card
