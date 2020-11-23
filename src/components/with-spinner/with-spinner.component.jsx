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

// import React from "react"

// import {
//   SpinnerContainer,
//   SpinnerOverlay,
//   Container,
// } from "./with-spinner.styles"

// function withSpinner(WrappedComponent) {
//   const WithSpinner = ({ isLoading, innerRef, ...otherProps }) => {
//     return isLoading ? (
//       <Container>
//         <SpinnerContainer>
//           <SpinnerOverlay />
//         </SpinnerContainer>
//       </Container>
//     ) : (
//       <WrappedComponent ref={innerRef} {...otherProps} />
//     )
//   }

//   return React.forwardRef((props, ref) => (
//     <WithSpinner {...props} innerRef={ref} />
//   ))
// }

// export default withSpinner
