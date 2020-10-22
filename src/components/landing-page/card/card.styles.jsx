import styled, { css } from "styled-components"
import { Link } from "gatsby"

export const PriceContainer = styled.div`
  background: ${props => props.color};
  border-radius: 5px;
  color: white;
  height: 200px;
  width: 235px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  z-index: 3;

  ${props =>
    props.highlight
      ? css`
          width: 275px;
          margin-top: -40px;
        `
      : ""}

  & > * {
    margin-top: 25px;
  }

  & span:last-child {
    margin-bottom: 25px;
    font-size: 0.75rem;
  }
`

export const Price = styled.div`
  margin-left: -10px;
  & span:nth-child(2) {
    font-size: 3rem;
  }
`

export const Features = styled.section`
  background: ${props => props.color};
  width: 100%;
  max-width: 235px;
  padding: 25px;
  margin-top: -10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  ul > li {
    border-bottom: 1px solid #d9d9d9;
    list-style: none;
    margin-bottom: 15px;
    padding-bottom: 15px;
  }

  ul {
    margin: 0;
    text-align: center;
  }

  ${props =>
    props.highlight
      ? css`
          max-width: 275px;
          margin-top: -5px;
          ul > li {
            margin-bottom: 17.5px;
            padding-bottom: 17.5px;
          }
        `
      : ""}
`
export const Li = styled.li`
  ${props =>
    !props.visible
      ? css`
          color: #d9d9d9;
        `
      : ""}
`
export const A = styled(Link)`
  padding: 10px 25px;
  text-align: center;
  background: ${props => props.color};
  transition: all 0.3s ease-in;
  border-radius: 5px;
  color: white;
  margin-top: 15px;

  &:hover {
    background: #bf0436;
    font-size: 1.1rem;
  }
`
