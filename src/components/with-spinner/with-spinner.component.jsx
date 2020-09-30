import React from "react"

import {
  SpinnerContainer,
  SpinnerOverlay,
  Container,
} from "./with-spinner.styles"

export const WithSpinner = WrappedComponent => ({
  isLoading,
  ...otherProps
}) => {
  return isLoading ? (
    <Container>
      <SpinnerContainer>
        <SpinnerOverlay />
      </SpinnerContainer>
    </Container>
  ) : (
    <WrappedComponent {...otherProps} />
  )
}

export default WithSpinner
