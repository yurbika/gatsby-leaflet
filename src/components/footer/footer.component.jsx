import React from "react"

//styles
import { Container } from "./footer.styles"

const Footer = () => {
  return (
    <Container>
      <small>
        &copy;{" "}
        <a
          href="https://www.xn--berkayyurdagl-7ob.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Berkay Yurdagül
        </a>
      </small>
    </Container>
  )
}

export default Footer
