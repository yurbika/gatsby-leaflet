import styled from "styled-components"

export const Help = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  margin-top: 15px;

  svg {
    height: 100%;
    max-height: 120px;
    min-height: 120px;
  }

  ul {
    position: relative;
    height: 100%;
    padding: 15px;
    background: var(--clr-blue);
    border-radius: 5px;
    max-width: 350px;
    margin-bottom: 35px;
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

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 0;
      border: 20px solid transparent;
      border-top-color: var(--clr-blue);
      border-bottom: 0;
      margin-left: -20px;
      margin-bottom: -20px;
    }
  }
`

export const Container = styled.article`
  padding: 0 15px;
`

export const ResultsInfo = styled.div`
  width: 100%;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 50px;
  padding: 0 15px;

  p {
    background: var(--clr-red);
    color: white;
    border-radius: 5px;
    padding: 5px 15px;
  }
`

export const SearchResultsInfo = styled.div`
  width: 100%;
  text-align: center;
  margin: 0 auto;
  margin: 50px 0;
  padding: 0 15px;

  p {
    background: rgba(0, 0, 0, 0.5);
    padding: 30px 15px;
    border-radius: 5px;
    color: white;
  }
`

export const Wrapper = styled.div`
  width: 100vw;
  max-width: 600px;
  position: relative;
  overflow-y: scroll;
  @media (max-width: 1025px) {
    max-width: unset;
  }
  @media (max-width: 768px) {
    ${SearchResultsInfo},
    ${ResultsInfo},
    ${Container} {
      padding: 0 5px;
    }
  }
`

export const SpinnerWrapper = styled.div`
  height: calc(100vh - 140px);
  position: relative;

  & > div {
    box-shadow: none;
  }

  @media (max-width: 768px) {
    height: calc(100vh - 115px);
  }
`
