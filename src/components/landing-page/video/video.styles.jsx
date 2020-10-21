import styled from "styled-components"

export const Overlay = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  z-index: -1;
`

export const LinkBackground = styled.div`
  background: #bf0436;
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
`
