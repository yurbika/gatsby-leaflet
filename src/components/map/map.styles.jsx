import styled, { css } from "styled-components"
import { Map } from "react-leaflet"

export const SCMap = styled(Map)`
  height: 100vh;
  width: 100%;
  background: #bbe2f2;

  .kml-polyline:hover {
    stroke-width: 10px;
    stroke-linejoin: round;
    stroke: #bf0436;
  }
  .kml-polyline {
    stroke-width: 5px;
    ${props =>
      props.isPlaying
        ? css`
            opacity: 0.4;
          `
        : ""}
  }

  .info {
    padding: 15px;
    font-size: 14px;
    background: white;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    &,
    & * {
      font-family: "Montserrat", sans-serif;
    }

    .info__heading {
      font-size: 16px;
      margin: 0 0 5px;
      color: #777;
    }
  }

  .info .warning {
    padding: 15px;
    font-size: 14px;
    line-height: 21px;
    background: #bf0436;
    color: white;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    max-width: 150px;
  }

  .legend {
    line-height: 18px;
    color: #555;

    .legend__color {
      width: 18px;
      height: 18px;
      float: left;
      margin-right: 8px;
      opacity: 0.7;
    }
  }
`
