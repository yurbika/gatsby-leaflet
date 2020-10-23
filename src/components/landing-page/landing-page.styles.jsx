import styled from "styled-components"

export const Container = styled.div`
  overflow-x: hidden;
`
export const HLine = styled.div`
  height: 3px;
  width: calc(100vw - 100px);
  max-width: 1600px;
  margin-top: 50px;
  background: #bf0436;

  @media (max-width: 568px) {
    width: calc(100vw - 60px);
  }
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
`
