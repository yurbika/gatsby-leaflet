import styled, { css } from "styled-components"

export const LogoContainer = styled.div`
  width: 50px;
  height: 50px;

  img {
    margin: 0;
  }
  .img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`

export const HamburgerMenuItems = styled.div`
  position: relative;
  transition: all 0ms 300ms;
  width: 30px;
  height: 30px;

  &,
  &:after,
  &:before {
    height: 3px;
    border-radius: 15px;
  }
  &:before {
    content: "";
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 5px;
    background: #bf0436;
    transition: bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  &:after {
    content: "";
    width: 100%;
    position: absolute;
    left: 0;
    top: 5px;
    background: #bf0436;
    transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  ${props =>
    props.active
      ? css`
          &:after,
          &:before {
            z-index: 11;
          }
          &:after {
            top: 0;
            transform: rotate(45deg);
            transition: top 300ms cubic-bezier(0.23, 1, 0.32, 1),
              transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
          }
          &:before {
            bottom: 0;
            transform: rotate(-45deg);
            transition: bottom 300ms cubic-bezier(0.23, 1, 0.32, 1),
              transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
          }
        `
      : ""}
`

export const HamburgerMenu = styled.button`
  height: 100%;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
`

export const Nav = styled.nav`
  width: 100%;
  max-width: 100vw;
  height: 75px;
  background: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  ${props =>
    props.showShadow
      ? css`
          box-shadow: 0 1px 3px rgba(51, 23, 23, 0.15);
        `
      : ""}
`
