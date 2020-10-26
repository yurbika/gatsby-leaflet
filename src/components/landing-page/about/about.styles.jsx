import styled from "styled-components"

export const Container = styled.article`
  height: 100%;
  width: 100%;
  max-width: 1500px;
  padding: 0 50px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  position: relative;

  svg {
    position: absolute;
    z-index: 1;
    opacity: 0.05;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    margin-bottom: 75px;
    max-height: 635px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 0 35px;
    svg {
      max-height: unset;
      width: calc(100% - 70px);
    }
  }
`

export const Heading = styled.h2`
  text-decoration: underline;
  text-align: center;
  font-size: 2rem;
`

export const RowOne = styled.section`
  height: 100%;
  margin-right: 100px;

  ul {
    margin-top: 100px !important;
  }
`

export const RowTwo = styled.section`
  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  & li:last-child {
    text-align: center;
    margin-top: auto;
    margin-bottom: auto;
  }

  & li:nth-child(3) {
    margin-bottom: 0;
  }

  li {
    a {
      display: inline-block;
      padding: 10px 15px;
      border-radius: 5px;
      border: 3px solid #bf0436;
      color: #bf0436;
      transition: all 0.3s ease-in;
      font-weight: bold;

      &:hover {
        background: #bf0436;
        color: white;
      }
    }
  }
`

export const ImageContainer = styled.section`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    border-radius: 5px;
  }
`

export const ImageOverlayContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  z-index: 1;
  padding: 10px;
`

export const ImageOverlay = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  border-radius: 5px;
`
export const Content = styled.section`
  display: flex;
  margin-top: 100px;

  ul {
    list-style: none;
    margin: 0;

    li {
      margin-bottom: 75px;
      h2 {
        margin-bottom: 25px;
      }
      p {
        line-height: 32px;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 50px;

    ${RowOne} {
      margin: 0;
    }

    ${RowTwo} {
      & li:last-child {
        text-align: center;
        margin-top: 100px;
        margin-bottom: 100px;
      }
    }
  }
`
