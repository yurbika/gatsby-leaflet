import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

//components
import Navigation from "./navigation/navigation.component"

//styles
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
