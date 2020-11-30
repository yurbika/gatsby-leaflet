import styled, { css } from "styled-components"

import { Wrapper as VideoContainer } from "../video-container/video-container.styles"
import { SCMap } from "../map/map.styles"

export const Container = styled.article`
  position: relative;
  display: flex;
  height: 100vh;
  padding-top: 75px;
  overflow: hidden;

  & > button {
    display: none;
    visibility: hidden;
    position: absolute;
    bottom: 35px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px 15px;
    border-radius: 5px;
    right: 0;
    left: 0;
    margin: 0 auto;
    z-index: 10;
    font-weight: bold;
    color: #bf0436;
    border: 3px solid #bf0436;

    &:hover,
    &:focus {
      color: white;
      background: #bf0436;
    }
  }

  @media (max-width: 1025px) {
    & > button {
      display: block;
      visibility: visible;
    }

    ${VideoContainer} {
      display: none;
      visibility: hidden;
    }

    ${props =>
      props.show
        ? css`
            ${SCMap} {
              display: none;
              visibility: hidden;
            }

            ${VideoContainer} {
              display: block;
              visibility: visible;
            }
          `
        : css`
            ${SCMap} {
              display: block;
              visibility: visible;
            }

            ${VideoContainer} {
              display: none;
              visibility: hidden;
            }
          `}
  }

  @media (max-width: 768px) {
    padding-top: 50px;
  }
`
