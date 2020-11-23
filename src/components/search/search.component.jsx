import React from "react"

//assets
import Arrow from "../../assets/arrow.svg"

//styles
import * as Styled from "./search.styles"

const Search = () => {
  return (
    <Styled.Container>
      <Styled.InputWrapper>
        <input type="text" id="searchText" placeholder="Search" />
        <label htmlFor="searchText">Search</label>
      </Styled.InputWrapper>
      <Styled.ButtonWrapper>
        <button>
          <span>Sort by</span>
          <Arrow />
        </button>
      </Styled.ButtonWrapper>
    </Styled.Container>
  )
}

export default Search
