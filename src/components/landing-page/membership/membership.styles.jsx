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

  p {
    width: 100%;
    max-width: 1000px;
  }

  .omamori {
    opacity: 0.05;
    position: absolute;
    z-index: -1;
    height: 275px;
  }

  .omamori__right {
    right: 35px;
    top: 35px;
    transform: rotateZ(-45deg);
  }

  .omamori__left {
    bottom: 0;
    left: 22%;
    transform: rotateZ(35deg);
  }

  @media (max-width: 768px) {
    padding: 0 35px;

    h2 {
      font-size: 1.65rem;
    }

    p {
      line-height: 35px;
    }

    .omamori {
      height: 200px;
    }
  }
`
export const Cards = styled.section`
  display: flex;
  align-self: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  margin-top: 100px;
  margin-bottom: 50px;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`
