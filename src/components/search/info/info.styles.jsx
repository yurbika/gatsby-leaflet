import styled, { css } from "styled-components"

export const Ul = styled.ul`
  margin-left: 0;

  h2 {
    font-size: 20px;
    text-align: center;
    margin-bottom: 15px;
    text-decoration: underline;
  }

  & li:first-child {
    list-style: none;
  }

  li {
    font-size: 16px;
    list-style-type: disc;
    list-style-position: inside;
    text-indent: -25px;
    padding-left: 30px;
  }
`

export const Container = styled.article`
  position: absolute;
  top: 35px;
  right: 0;
  padding: 15px;
  background: #00b6c8;
  border-radius: 5px;
  width: 100vw;
  z-index: 2;
  max-width: 300px;
  display: none;
  visibility: hidden;

  ${props =>
    props.expand
      ? css`
          display: inline-block;
          visibility: visible;
        `
      : ""}
`

export const PageChanger = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 0 15px;

  button:first-child {
    transform: scaleX(-1);
  }

  button {
    background: none;
    border: none;
    border-radius: 5px;
    padding: 5px 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 8px;
      min-width: 8px;
      * {
        stroke-width: 5;
        stroke: white;
      }
    }
  }

  span {
    font-weight: bold;
    color: white;
  }

  ${props =>
    props.hidden
      ? css`
          button:first-child,
          button:last-child {
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
          }
        `
      : ""}
`
