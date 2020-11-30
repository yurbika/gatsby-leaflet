import React, { useState } from "react"
import { connect } from "react-redux"

//components
import Info from "./info/info.component"

//redux
import { setSortByAndOrder } from "../../redux/search/search.actions"

//assets
import Arrow from "../../assets/arrow.svg"

//styles
import * as Styled from "./search.styles"

const Search = ({ setSortByAndOrder }) => {
  const [expand, setExpand] = useState(false)
  const [expandInfo, setExpandInfo] = useState(false)

  return (
    <Styled.Container>
      <Styled.InputWrapper>
        <input type="text" id="searchText" placeholder="Search" />
        <label htmlFor="searchText">Search</label>
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

const mapDispatchToProps = dispatch => ({
  setSortByAndOrder: obj => dispatch(setSortByAndOrder(obj)),
})

export default connect(null, mapDispatchToProps)(Search)
