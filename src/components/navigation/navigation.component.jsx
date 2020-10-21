import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"

//styles
import "./navigation.styles.scss"
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
        <Image fluid={fluid} />
      </Styled.LogoContainer>
      <Styled.HamburgerMenu onClick={() => setActive(!active)}>
        <Styled.HamburgerMenuItems active={active} />
      </Styled.HamburgerMenu>
    </Styled.Nav>
  )
}

export default Navigation
