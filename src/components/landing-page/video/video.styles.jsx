import styled, { css } from "styled-components"

export const Overlay = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  z-index: -1;
`

export const LinkBackground = styled.div`
  background: var(--clr-red);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.3s ease-in;
  opacity: 0;
`

export const Line = styled.div`
  position: absolute;
  width: 4px;
  height: 50px;
  background: white;
  bottom: 0;

  ${props =>
    props.reverse
      ? css`
          background: var(--clr-red);
          position: static;
          bottom: unset;
        `
      : ""}
`

export const HeadingGroup = styled.hgroup`
  background: rgba(0, 0, 0, 0.5);
  padding: 50px 40px;
  border-radius: 5px;
  text-align: center;
  & > * {
    color: white;
    display: block;
  }

  h1 {
    text-decoration: underline;
  }

  h2 {
    margin: 0;
    font-size: 1rem;
    font-weight: normal;
  }
`
export const VideoSection = styled.article`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 30px;
  overflow: hidden;

  video {
    /* Center the video */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: -1;
    min-width: 100%;
    min-height: 100%;

    /* Setting width & height to auto prevents the browser from stretching or squishing the video */
    width: auto;
    height: auto;
  }

  a {
    color: white;
    border: 3px solid white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 75px;
    font-weight: 600;
    font-size: 14px;
    position: relative;

    &:hover {
      ${LinkBackground} {
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    ${HeadingGroup} {
      h1 {
        font-size: 2rem;
        line-height: 45px;
      }
    }
  }

  @media (max-width: 568px) {
    ${HeadingGroup} {
      padding: 25px 15px;
      h1 {
        font-size: 1.75rem;
        text-decoration: none;
        line-height: 45px;
        margin-bottom: 0;
      }

      h2 {
        display: none;
      }
    }

    a {
      margin-top: 35px;
    }
  }

  @media (max-height: 468px) {
    ${HeadingGroup} {
      padding: 15px 25px;
      h1 {
        text-decoration: none;
        font-size: 1.75rem;
        line-height: 45px;
        margin-bottom: 0;
      }

      h2 {
        display: none;
      }
    }

    a {
      margin-top: 15px;
    }

    ${Line} {
      height: 15px;
    }
  }
`
