import React from "react"

//styles
import * as Styled from "./popup.styles"

const Popup = ({ show }) => {
  return (
    <Styled.Container show={show}>
      <Styled.MenuName show={show}>
        <h2>MENU</h2>
      </Styled.MenuName>
      <Styled.Ul show={show}>
        <li>HOME</li>
        <li>MAP</li>
        <li>WHY</li>
        <li>MEMBERSHIP</li>
        <li>ABOUT ME</li>
      </Styled.Ul>
    </Styled.Container>
  )
}

export default Popup
