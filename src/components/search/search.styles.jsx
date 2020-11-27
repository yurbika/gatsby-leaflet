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
`

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  input {
    color: #333;
    font-size: 18px;
    padding: 15px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    border: 1px solid black;
    width: 100%;
    display: block;
    height: 100%;
    transition: all 0.3s;
  }

  label {
    position: absolute;
    top: -13px;
    left: 15px;
    font-size: 12px;
    display: block;
    transition: all 0.3s;
    transform: translateY(0rem);
    border-radius: 50%;
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
`

export const ButtonWrapper = styled.div`
  margin-left: 35px;
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

    li {
      button {
        cursor: pointer;
        background: none;
        border: 1px solid transparent;
        border-radius: 5px;
        padding: 5px;

        &:hover,
        &:focus {
          border-color: #bf0436;
          color: #bf0436;
        }
      }
    }
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
    border: 2px solid #00b6c8;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    font-weight: bold;
    color: #00b6c8;
    cursor: pointer;

    span {
      display: inline-block;
      margin-top: 2.75px;
    }
  }

  ul {
  }
`
