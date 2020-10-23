import styled, { css } from "styled-components"

export const Square = styled.div`
  width: 30%;
  padding-bottom: 25%; /* = width for a 1:1 aspect ratio */
  border-radius: 5px;

  ${props =>
    css`
      background: ${props.backgroundColor};
    `}
`
export const Container = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 50px;

  section {
    margin-right: 100px;
    width: 100%;
    max-width: 650px;

    h2 {
      margin-bottom: 25px;
      font-size: 28px;
      text-decoration: none;
    }

    p {
      line-height: 35px;
    }
  }

  ${props =>
    props.left
      ? css`
          section {
            order: 1;
            margin-right: 0;
            margin-left: 100px;
          }
        `
      : ""}

  @media (max-width: 1200px) {
    flex-direction: column;

    section {
      order: 1;
      margin: 0;
      margin-top: 75px;

      h2 {
        text-align: center;
      }
    }

    ${Square} {
      width: 65%;
      padding-bottom: 40%; /* = width for a 1:1 aspect ratio */
    }
  }

  @media (max-width: 568px) {
    margin-top: 75px;
    section {
      margin-top: 75px;
    }
  }
`
