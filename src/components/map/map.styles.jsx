import styled, { css } from "styled-components"
import { Map } from "react-leaflet"

export const SCMap = styled(Map)`
  height: calc(100vh - 75px);
  width: 100%;
  background: var(--clr-ocean-blue);
  z-index: 9;

  .kml-polyline:hover {
    stroke-width: 10px;
    stroke-linejoin: round;
    stroke: var(--clr-red);
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
      color: var(--clr-grey-3);
    }
  }

  .info .warning {
    padding: 15px;
    font-size: 14px;
    line-height: 21px;
    background: var(--clr-red);
    color: white;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    max-width: 150px;
  }

  .legend {
    line-height: 18px;
    color: var(--clr-grey);

    .legend__color {
      width: 18px;
      height: 18px;
      float: left;
      margin-right: 8px;
      opacity: 0.7;
    }

    @media (max-width: 568px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    height: calc(100vh - 50px);
  }
`
