import styled, { css } from "styled-components"

export const Container = styled.article`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: auto;
  max-width: 1150px;
  margin: auto;
  margin-bottom: 35px;
  border: 1px solid var(--clr-grey-2);
  border-radius: 5px;
  margin-bottom: 100px;

  ${props =>
    props.selected
      ? css`
          border: 3px solid var(--clr-red);
          border-radius: 7px;
        `
      : ""}
`

export const EmbedContainer = styled.div`
  position: relative;
  height: 100%;
  max-height: 300px;
  width: 100%;
  padding-bottom: 75%;

  .embed-container__iframe {
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-height: 675px;
  }
`

export const InfoBox = styled.section`
  line-height: 24px;
  font-size: 14px;
  padding: 0 35px;
  margin-top: 35px;
  width: 100%;

  ul {
    list-style: none;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    width: 100%;
    justify-content: space-between;

    li {
      white-space: nowrap;
      width: 105px;
    }
  }

  @media (max-width: 768px) {
    padding: 0 25px;
  }
`

export const InfoBox__Description = styled.pre`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  white-space: pre-line;
  ${props =>
    !props.expand
      ? css`
          @supports (-webkit-line-clamp: 3) {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        `
      : ""}
`

export const Button = styled.button`
  background: none;
  padding: 5px 0;
  font-size: 12px;
  border: none;
  cursor: pointer;
  margin-bottom: 15px;
  span {
    display: inline-block;
    color: var(--clr-red);
    font-weight: bold;
    border-bottom: 2px solid;
  }

  ${props =>
    props.fullBorder
      ? css`
          span {
            border: 2px solid var(--clr-red);
            border-radius: 5px;
            padding: 5px;

            &:hover {
              background: var(--clr-red);
              color: white;
            }
          }
        `
      : ""}
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`
