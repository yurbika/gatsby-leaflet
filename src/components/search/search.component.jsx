import React, { useState } from "react"

//assets
import Arrow from "../../assets/arrow.svg"

//styles
import * as Styled from "./search.styles"

const Search = () => {
  const [expand, setExpand] = useState(false)
  return (
    <Styled.Container>
      <Styled.InputWrapper>
        <input type="text" id="searchText" placeholder="Search" />
        <label htmlFor="searchText">Search</label>
      </Styled.InputWrapper>
      <Styled.ButtonWrapper expand={expand}>
        <button onClick={() => setExpand(!expand)}>
          <span>Sort by</span>
          <Arrow />
        </button>
        <ul>
          <li>Kilometers (Ascending)</li>
          <li>Kilometers (Decending)</li>
          <li>Duration (Ascending)</li>
          <li>Duration (Decending)</li>
          <li>Date (Latest)</li>
          <li>Date (Oldest)</li>
        </ul>
      </Styled.ButtonWrapper>
    </Styled.Container>
  )
}

export default Search
