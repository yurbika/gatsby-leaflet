import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Image from "gatsby-image"

//assets
import Cat from "../../../assets/cat.svg"

//styles
import * as Styled from "./about.styles"

const query = graphql`
  {
    file(relativePath: { eq: "me.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const About = () => {
  const {
    file: {
      childImageSharp: { fluid },
    },
  } = useStaticQuery(query)
  return (
    <Styled.Container>
      <Cat />
      <Styled.Heading>About me</Styled.Heading>
      <Styled.Content>
        <Styled.RowOne>
          <Styled.ImageContainer>
            <Styled.ImageOverlayContainer>
              <Styled.ImageOverlay></Styled.ImageOverlay>
            </Styled.ImageOverlayContainer>
            <Image fluid={fluid} />
          </Styled.ImageContainer>
          <ul>
            <li>
              <h2>What are my favourite places in Japan?</h2>
              <p>
                Vinyl cliche art party offal venmo. Hammock officia fixie,
                jianbing heirloom nostrud sustainable. Occaecat viral
                gluten-free roof party squid dolore.
              </p>
            </li>
            <li>
              <h2>Why I dont show my face?</h2>
              <p>
                Vinyl cliche art party offal venmo. Hammock officia fixie,
                jianbing heirloom nostrud sustainable. Occaecat viral
                gluten-free roof party squid dolore.
              </p>
            </li>
            <li>
              <h2>What are my must see suggestions for Japan?</h2>
              <p>
                Vinyl cliche art party offal venmo. Hammock officia fixie,
                jianbing heirloom nostrud sustainable. Occaecat viral
                gluten-free roof party squid dolore.
              </p>
            </li>
          </ul>
        </Styled.RowOne>
        <Styled.RowTwo>
          <ul>
            <li>
              <h2>Who I am?</h2>
              <p>
                Vinyl cliche art party offal venmo. Hammock officia fixie,
                jianbing heirloom nostrud sustainable. Occaecat viral
                gluten-free roof party squid dolore.
              </p>
            </li>
            <li>
              <h2>Which equipment do I use?</h2>
              <p>
                Vinyl cliche art party offal venmo. Hammock officia fixie,
                jianbing heirloom nostrud sustainable. Occaecat viral
                gluten-free roof party squid dolore.
              </p>
            </li>
            <li>
              <h2>Where are some unusual places i have been?</h2>
              <p>
                Vinyl cliche art party offal venmo. Hammock officia fixie,
                jianbing heirloom nostrud sustainable. Occaecat viral
                gluten-free roof party squid dolore.
              </p>
            </li>
            <li>
              <h2>What is next?</h2>
              <Link to="/map">Explore Japan</Link>
            </li>
          </ul>
        </Styled.RowTwo>
      </Styled.Content>
    </Styled.Container>
  )
}

export default About
