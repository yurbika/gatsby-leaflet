import React from "react"
import { Link } from "gatsby"
//styles
import * as Styled from "./popup.styles"

const Popup = ({ show }) => {
  return (
    <Styled.Container show={show}>
      <Styled.MenuName show={show}>
        <h2>MENU</h2>
      </Styled.MenuName>
      <Styled.Ul show={show}>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/map">MAP</Link>
        </li>
      </Styled.Ul>
    </Styled.Container>
  )
}

export default Popup
