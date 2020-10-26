import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Image from "gatsby-image"

//components
import Popup from "../popup/popup.component"

//styles
import * as Styled from "./navigation.styles"

const query = graphql`
  {
    file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const Navigation = () => {
  const {
    file: {
      childImageSharp: { fluid },
    },
  } = useStaticQuery(query)

  const [active, setActive] = useState(false)

  return (
    <Styled.Nav>
      <Styled.LogoContainer>
        <Link to="/">
          <Image fluid={fluid} />
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
