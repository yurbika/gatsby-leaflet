import styled, { css } from "styled-components"

export const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  -webkit-transition: all 0.3s ease-in;
  -o-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  z-index: -10;
  pointer-events: none;
  visibility: hidden;
  ${props =>
    props.show
      ? css`
          opacity: 1;
          z-index: 10;
          pointer-events: visible;
          visibility: visible;
        `
      : ""}
`

export const MenuName = styled.div`
  position: absolute;
  top: 29px;
  right: 75px;
  width: auto;
  height: auto;
  z-index: 11;
  color: var(--clr-red);
  text-align: center;
  transition: all 0.2s ease-in;
  transform: translate3d(200px, 0, 0);
  visibility: hidden;

  ${props =>
    props.show
      ? css`
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          visibility: visible;
        `
      : ""}

  h2 {
    margin: 0;
    font-weight: bold;
    font-size: 1rem;
  }
`

export const Ul = styled.ul`
  width: 100%;
  max-width: 200px;
  min-width: 200px;
  height: 100%;
  background: white;
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  transform: translate3d(200px, 0, 0);
  list-style: none;
  visibility: hidden;
  font-weight: 600;

  & > * {
    margin-bottom: 15px;
    margin-left: 0;
  }

  li:first-child {
    margin-top: 75px;
  }

  &:hover > li {
    opacity: 0.4;
  }

  &:hover > li:hover {
    opacity: 1;
  }

  ${props =>
    props.show
      ? css`
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          visibility: visible;
        `
      : ""}
`
