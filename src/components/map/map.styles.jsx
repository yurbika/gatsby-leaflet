import styled, { keyframes } from "styled-components"
import { Map } from "react-leaflet"

const dashdraw = dash => keyframes`
from {stroke-dashoffset: ${dash}}
to {stroke-dashoffset: 0}
`

export const SCMap = styled(Map)`
  height: 100vh;
  width: 100%;
  background: #bbe2f2;

  .kml-polyline:hover {
    stroke-width: 10px;
    stroke-linejoin: round;
  }
  .kml-polyline {
    stroke-width: 5px;
  }
  .test {
    stroke-dasharray: ${props => props.test};
    stroke-dashoffset: ${props => props.test};
    animation: ${props => dashdraw(props.test)} 5s linear infinite;
  }
`
