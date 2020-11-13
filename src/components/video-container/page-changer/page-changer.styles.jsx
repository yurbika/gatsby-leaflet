import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 35px;
  padding: 0 15px;

  button:nth-child(2) {
    margin: 0 35px;
  }

  button:first-child {
    transform: scaleX(-1);
  }

  button {
    background: none;
    color: #bf0436;
    border: none;
    border-radius: 5px;
    padding: 5px 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 8px;
      * {
        stroke-width: 5;
      }
    }

    span {
      font-weight: bold;
    }
  }
`
