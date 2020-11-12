import styled from "styled-components"

export const Container = styled.article`
  width: 100vw;
  max-width: 600px;
  overflow-y: scroll;
  margin-top: 75px;
  padding: 0 15px;
`

export const Help = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  svg {
    height: 100%;
    max-height: 150px;
    min-height: 150px;
  }

  ul {
    position: relative;
    padding: 15px;
    background: #00b6c8;
    border-radius: 5px;
    max-width: 350px;
    margin-bottom: 35px;

    h2 {
      text-align: center;
      margin-bottom: 15px;
      text-decoration: underline;
    }

    & li:first-child {
      list-style: none;
    }

    li {
      list-style-type: disc;
      list-style-position: inside;
      text-indent: -25px;
      padding-left: 30px;
    }

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 0;
      border: 20px solid transparent;
      border-top-color: #00b6c8;
      border-bottom: 0;
      margin-left: -20px;
      margin-bottom: -20px;
    }
  }
`
