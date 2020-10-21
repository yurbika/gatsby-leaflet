import React from "react"
import { Link } from "gatsby"

//styles
import "./landing-page.styles.scss"

const LandingPage = () => {
  return (
    <article>
      <div className="overlay"></div>
      <section className="heading-group">
        <h1>Japan from a Different Perspective</h1>
        <span>
          Let me take you to places in Japan you have never seen before.
        </span>
      </section>
      <Link to="/map">
        <div className="link-background"></div>EXPLORE JAPAN
      </Link>
      <div className="line"></div>
    </article>
  )
}

export default LandingPage
