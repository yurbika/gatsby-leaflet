import styled, { css } from "styled-components"

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
`

export const Square = styled.div`
  width: 375px;
  height: 275px;
  background: black;
  border-radius: 5px;
  ${props =>
    css`
      background: ${props.backgroundColor};
    `}
  opacity:1;
`
