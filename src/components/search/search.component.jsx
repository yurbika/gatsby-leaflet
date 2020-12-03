import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

//components
import Info from "./info/info.component"

//redux
import {
  setSortByAndOrder,
  setTextAsync,
  setText,
  resetDebouncedText,
} from "../../redux/search/search.actions"

import {
  selectText,
  selectSortBy,
  selectOrder,
} from "../../redux/search/search.selectors"

import { setPage } from "../../redux/page-changer/page-changer.actions"

//assets
import Arrow from "../../assets/arrow.svg"
import Cancel from "../../assets/cancel.svg"

//styles
import * as Styled from "./search.styles"

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expand: false,
      expandInfo: false,
    }

    this.timeoutId = null
    this.onBlurHandler = this.onBlurHandler.bind(this)
    this.onFocusHandler = this.onFocusHandler.bind(this)
  }

  onBlurHandler(str) {
    this.timeOutId = setTimeout(() => {
      this.setState({
        [str]: false,
      })
    })
  }

  // If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeOutId)
  }

  render() {
    const {
      text,
      setText,
      setTextAsync,
      setSortByAndOrder,
      resetDebouncedText,
      sortBy,
      order,
      setPage,
    } = this.props
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
              setTextAsync(e.target.value)
            }}
            onKeyPress={e =>
              e.key === "Enter" ? setTextAsync(e.target.value) : null
            }
          />
          <label htmlFor="searchText">Search</label>
          <button
            onClick={() => {
              setText("")
              resetDebouncedText()
            }}
          >
            <Cancel />
          </button>
        </Styled.InputWrapper>
        <Styled.Wrapper>
          <Styled.ButtonWrapper expand={this.state.expand}>
            <button
              onClick={() => this.setState({ expand: !this.state.expand })}
              onBlur={() => this.onBlurHandler("expand")}
            >
              <span>Sort by</span>
              <Arrow />
            </button>
            <ul
              onClick={() => {
                this.setState({ expand: false })
                setPage(0)
              }}
              onBlur={() => this.onBlurHandler("expand")}
              onFocus={this.onFocusHandler}
            >
              <Styled.Li active={sortBy === "km" && order === true}>
                <button
                  onClick={() =>
                    setSortByAndOrder({ sortBy: "km", order: true })
                  }
                >
                  Kilometers (Ascending)
                </button>
              </Styled.Li>
              <Styled.Li active={sortBy === "km" && order === false}>
                <button
                  onClick={() =>
                    setSortByAndOrder({ sortBy: "km", order: false })
                  }
                >
                  Kilometers (Decending)
                </button>
              </Styled.Li>
              <Styled.Li active={sortBy === "videoLengthMS" && order === true}>
                <button
                  onClick={() =>
                    setSortByAndOrder({ sortBy: "videoLengthMS", order: true })
                  }
                >
                  Duration (Ascending)
                </button>
              </Styled.Li>
              <Styled.Li active={sortBy === "videoLengthMS" && order === false}>
                <button
                  onClick={() =>
                    setSortByAndOrder({ sortBy: "videoLengthMS", order: false })
                  }
                >
                  Duration (Decending)
                </button>
              </Styled.Li>
              <Styled.Li active={sortBy === "date" && order === false}>
                <button
                  onClick={() =>
                    setSortByAndOrder({ sortBy: "date", order: false })
                  }
                >
                  Date (Latest)
                </button>
              </Styled.Li>
              <Styled.Li active={sortBy === "date" && order === true}>
                <button
                  onClick={() =>
                    setSortByAndOrder({ sortBy: "date", order: true })
                  }
                >
                  Date (Oldest)
                </button>
              </Styled.Li>
            </ul>
          </Styled.ButtonWrapper>
          <Styled.InfoContainer>
            <button
              onClick={() =>
                this.setState({ expandInfo: !this.state.expandInfo })
              }
              onBlur={() => this.onBlurHandler("expandInfo")}
            >
              <span>i</span>
            </button>
            <Info
              expand={this.state.expandInfo}
              onFocus={this.onFocusHandler}
              onBlur={() => this.onBlurHandler("expandInfo")}
            />
          </Styled.InfoContainer>
        </Styled.Wrapper>
      </Styled.Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  text: selectText,
  sortBy: selectSortBy,
  order: selectOrder,
})

const mapDispatchToProps = dispatch => ({
  setSortByAndOrder: obj => dispatch(setSortByAndOrder(obj)),
  setTextAsync: txt => dispatch(setTextAsync(txt)),
  setText: txt => dispatch(setText(txt)),
  resetDebouncedText: () => dispatch(resetDebouncedText()),
  setPage: num => dispatch(setPage(num)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
