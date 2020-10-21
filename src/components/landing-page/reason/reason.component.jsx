import React from "react"

//styles
import * as Styled from "./reason.styles"

const Reason = ({ heading, txt, color, left }) => {
  return (
    <Styled.Container left={left}>
      <section>
        <h2>{heading}</h2>
        <p>{txt}</p>
      </section>
      <Styled.Square backgroundColor={color} />
    </Styled.Container>
  )
}

export default Reason
