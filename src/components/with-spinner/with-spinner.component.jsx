import React from "react"

import {
  SpinnerContainer,
  SpinnerOverlay,
  Container,
} from "./with-spinner.styles"

export const WithSpinner = WrappedComponent => ({
  isLoading,
  innerRef,
  ...otherProps
}) => {
  return isLoading ? (
    <Container>
      <SpinnerContainer>
        <SpinnerOverlay />
      </SpinnerContainer>
    </Container>
  ) : (
    <WrappedComponent ref={innerRef} {...otherProps} />
  )
}

export default WithSpinner
