import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

//components
import Navigation from "./navigation/navigation.component"

const Layout = ({ location, children }) => {
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
      <Navigation
        location={
          location && typeof window !== `undefined`
            ? location.pathname.replaceAll("/", "")
            : ""
        }
      />
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
