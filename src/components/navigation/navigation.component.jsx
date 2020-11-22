import React, { useState } from "react"
import { Link } from "gatsby"

//components
import Popup from "../popup/popup.component"

//styles
import * as Styled from "./navigation.styles"

const Navigation = () => {
  const [active, setActive] = useState(false)

  return (
    <Styled.Nav>
      <Styled.LogoContainer>
        <Link to="/">
          <div className="img"></div>
        </Link>
      </Styled.LogoContainer>
      <Styled.HamburgerMenu onClick={() => setActive(!active)}>
        <Styled.HamburgerMenuItems active={active} />
        <Popup show={active} />
      </Styled.HamburgerMenu>
    </Styled.Nav>
  )
}

export default Navigation
