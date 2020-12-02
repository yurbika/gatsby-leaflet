import styled, { css } from "styled-components"

export const Container = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-height: 100px;
  padding: 0 15px;
  margin-top: 35px;
  margin-bottom: 35px;

  & > * {
    height: 50px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: unset;
    justify-content: unset;
    max-height: unset;
  }
`

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  input {
    color: #333;
    font-size: 18px;
    padding: 15px;
    padding-right: 45px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    border: 1px solid black;
    width: 100%;
    display: block;
    height: 100%;
    transition: all 0.3s;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  label {
    position: absolute;
    top: -13px;
    left: 15px;
    font-size: 12px;
    display: block;
    transition: all 0.3s;
    transform: translateY(0rem);
    font-weight: bold;
    background: white;
    padding: 0 5px;
  }

  input:placeholder-shown + label {
    opacity: 0;
    visibility: hidden;
    -webkit-transform: translateY(1rem);
    transform: translateY(1rem);
  }

  button {
    position: absolute;
    display: none;
    visibility: hidden;
    right: 10px;
    top: -2px;
    bottom: 0;
    margin: auto 0;
    max-height: 20px;
    max-width: 20px;
    background: none;
    border: none;
    cursor: pointer;

    svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: var(--clr-red);
    }
  }

  ${props =>
    props.show
      ? css`
          button {
            display: inline-block;
            visibility: visible;
          }
        `
      : ""}
`

export const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 135px;
  position: relative;

  & > button {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    background: none;
    border-radius: 5px;
    border: 1px solid black;
    padding: 15px;
    cursor: pointer;
    height: 100%;
    width: 100%;
    color: black;

    svg {
      width: 15px;
      height: 15px;
      transform: rotate(90deg);
      * {
        stroke-width: 5;
        stroke: black;
      }
    }
  }

  ul {
    display: none;
    visibility: hidden;
    position: absolute;
    left: 0;
    background: white;
    padding: 15px;
    z-index: 1;
    list-style: none;
    font-size: 14px;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    margin: 0;
    text-align: center;
  }
  ${props =>
    props.expand
      ? css`
          ul {
            display: block;
            visibility: visible;
          }
        `
      : ""}
`

export const Li = styled.li`
  button {
    cursor: pointer;
    background: none;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 5px;

    &:hover,
    &:focus {
      border-color: var(--clr-red);
      color: var(--clr-red);
    }
  }
  ${props =>
    props.active
      ? css`
          & {
            button {
              border: 2px solid var(--clr-red);
              color: var(--clr-red);
              font-weight: bold;
            }
          }
        `
      : ""}
`

export const InfoContainer = styled.div`
  width: 35px;
  height: 35px;
  margin-left: 15px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: 2px solid var(--clr-blue);
    border-radius: 50%;
    width: 25px;
    height: 25px;
    font-weight: bold;
    color: var(--clr-blue);
    cursor: pointer;

    span {
      display: inline-block;
      margin-top: 2.75px;
    }
  }
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 15px;
  min-width: 200px;
  & > * {
    height: 50px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    margin-top: 15px;
  }
`
