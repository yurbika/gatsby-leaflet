import styled from "styled-components"

export const Container = styled.article`
  position: relative;
  display: flex;
  height: 100vh;
  padding-top: 75px;
  overflow: hidden;

  & > button {
    position: absolute;
    bottom: 35px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px 15px;
    border-radius: 5px;
    right: 0;
    left: 0;
    margin: 0 auto;
    z-index: 10;
    font-weight: bold;
    color: #bf0436;
    border: 3px solid #bf0436;

    &:hover {
      color: white;
      background: #bf0436;
    }
  }

  @media (max-width: 1025px) {
  }
`
