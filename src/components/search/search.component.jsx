import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

//components
import Info from "./info/info.component"

//redux
import {
  setSortByAndOrder,
  setTextAsync,
  setText,
} from "../../redux/search/search.actions"
import { selectText } from "../../redux/search/search.selectors"

//assets
import Arrow from "../../assets/arrow.svg"
import Cancel from "../../assets/cancel.svg"

//styles
import * as Styled from "./search.styles"

const Search = ({ text, setText, setTextAsync, setSortByAndOrder }) => {
  const [expand, setExpand] = useState(false)
  const [expandInfo, setExpandInfo] = useState(false)

  return (
    <Styled.Container>
      <Styled.InputWrapper show={text.length > 0}>
        <input
          type="text"
          id="searchText"
          placeholder="Search"
          value={text}
          onChange={e => {
            setText(e.target.value)
            setTextAsync(text)
          }}
        />
        <label htmlFor="searchText">Search</label>
        <button onClick={() => setText("")}>
          <Cancel />
        </button>
      </Styled.InputWrapper>
      <Styled.Wrapper>
        <Styled.ButtonWrapper expand={expand}>
          <button onClick={() => setExpand(!expand)}>
            <span>Sort by</span>
            <Arrow />
          </button>
          <ul onClick={() => setExpand(false)}>
            <li>
              <button
                onClick={() => setSortByAndOrder({ sortBy: "km", order: true })}
              >
                Kilometers (Ascending)
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  setSortByAndOrder({ sortBy: "km", order: false })
                }
              >
                Kilometers (Decending)
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  setSortByAndOrder({ sortBy: "videoLengthMS", order: true })
                }
              >
                Duration (Ascending)
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  setSortByAndOrder({ sortBy: "videoLengthMS", order: false })
                }
              >
                Duration (Decending)
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  setSortByAndOrder({ sortBy: "date", order: false })
                }
              >
                Date (Latest)
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  setSortByAndOrder({ sortBy: "date", order: true })
                }
              >
                Date (Oldest)
              </button>
            </li>
          </ul>
        </Styled.ButtonWrapper>
        <Styled.InfoContainer>
          <button onClick={() => setExpandInfo(!expandInfo)}>
            <span>i</span>
          </button>
          <Info expand={expandInfo} />
        </Styled.InfoContainer>
      </Styled.Wrapper>
    </Styled.Container>
  )
}

const mapStateToProps = createStructuredSelector({
  text: selectText,
})

const mapDispatchToProps = dispatch => ({
  setSortByAndOrder: obj => dispatch(setSortByAndOrder(obj)),
  setTextAsync: txt => dispatch(setTextAsync(txt)),
  setText: txt => dispatch(setText(txt)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
