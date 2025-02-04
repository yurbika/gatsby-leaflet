import styled from "styled-components"

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
  position: relative;
  max-width: 1500px;
  height: 100%;
  width: 100%;
  padding: 0 50px;
  h2 {
    text-decoration: underline;
    font-size: 2rem;
  }

  p {
    line-height: 32px;
    margin-top: 25px;
  }

  .reason-section__background {
    width: 100%;
    height: 100%;
    opacity: 3%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
  }

  @media (max-width: 1200px) {
    .reason-section__background {
      height: auto;
    }
  }

  @media (max-width: 568px) {
    padding: 0 35px;

    .reason-section__background {
      top: 100px;
    }

    h2 {
      font-size: 1.65rem;
    }

    p {
      line-height: 35px;
    }
  }
`
