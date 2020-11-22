import styled from "styled-components"

export const Container = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-height: 100px;
  padding: 0 15px;
  margin-top: 15px;
  margin-bottom: 15px;

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

  button {
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
`
