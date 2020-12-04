import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import isEqual from "lodash.isequal"

//component
import Video from "../video/video.component"
import PageChanger from "./page-changer/page-changer.component"
import Footer from "../footer/footer.component"
import Search from "../search/search.component"

//redux
import {
  selectVideos,
  selectZoom,
  selectCurMapTarget,
  selectRoutes,
  selectIsFetching,
} from "../../redux/map/map.selectors"
import { clearVideos } from "../../redux/map/map.actions"

import {
  selectOrder,
  selectSortBy,
  selectDebouncedText,
} from "../../redux/search/search.selectors"

import { selectCurPage } from "../../redux/page-changer/page-changer.selectors"

//assets
import Kitty from "../../assets/kitty.svg"
import help from "../search/info/help"

//utils
import ID_GENERATOR from "../../uniqueKey"
import { sortVideosByValue, sortByText } from "./utils/utils"
import CONSTANTS from "../../constants/constants"

//styles
import * as Styled from "./video-container.styles"
import * as Spinner from "../with-spinner/with-spinner.styles"

class VideoContainer extends React.Component {
  state = {
    videos: this.props.videos,
    sortBy: "",
    order: true,
    text: "",
    curPage: 0,
    searchResults: [],
  }

  static getDerivedStateFromProps(props, state) {
    if (props.zoom < CONSTANTS.zoomBreak) return { videos: [] }

    let arr = []
    let changes = {}
    let searchResults = []

    //search based on text
    if (props.videos && props.text.length > 2) {
      searchResults = sortByText(props.videos, props.text)
      changes.searchResults = searchResults
      changes.text = props.text
    } else {
      changes.searchResults = []
    }

    //sort incoming videos
    if (
      (props.videos &&
        (!isEqual(state.sortBy, props.sortBy) ||
          !isEqual(state.order, props.order))) ||
      !isEqual(props.videos, state.videos) ||
      props.text.length > 2
    ) {
      if (searchResults.length === 0)
        arr = sortVideosByValue(
          props.videos,
          props.sortBy,
          props.order,
          props.curMapTarget
        )
      else
        arr = sortVideosByValue(
          searchResults,
          props.sortBy,
          props.order,
          props.curMapTarget
        )

      changes.sortBy = props.sortBy
      changes.order = props.order
      changes.videos = arr
    }

    //show max videos of 10 depending on curPage
    if (
      (!isEqual(props.videos, state.videos) &&
        props.zoom >= CONSTANTS.zoomBreak) ||
      props.text.length > 2 ||
      state.curPage !== props.curPage
    ) {
      const maxVideos = CONSTANTS.maxVideos

      if (arr.length > 0)
        arr = arr.slice(
          props.curPage * maxVideos,
          maxVideos * props.curPage + maxVideos
        )
      else
        arr = props.videos.slice(
          props.curPage * maxVideos,
          maxVideos * props.curPage + maxVideos
        )

      changes.videos = arr
      changes.curPage = props.curPage
    }
    return changes || null
  }

  componentDidUpdate() {
    this.myRef.scroll(0, 0)
  }

  render() {
    return (
      <Styled.Wrapper
        ref={ref => (this.myRef = ref)}
        onScroll={() => {
          //fixing styling bug with autocomplete
          let a = document.activeElement
          a.focus()
          a.blur()
        }}
      >
        {this.state.videos.length !== 0 ? <Search /> : null}
        {this.state.videos.length !== 0 ? (
          <Styled.ResultsInfo>
            <p>
              Showing{" "}
              {this.state.searchResults.length > 0
                ? Math.min(
                    this.props.videos.length,
                    this.state.searchResults.length
                  )
                : this.props.videos.length}{" "}
              of{" "}
              {/*a route can have multiple ids so to ensure max i use math.max*/}
              {Math.max(this.props.routes.cur.length, this.props.videos.length)}{" "}
              results in this area
            </p>
          </Styled.ResultsInfo>
        ) : null}
        {this.state.searchResults &&
        this.state.searchResults.length === 0 &&
        this.props.text.length > 0 ? (
          <Styled.SearchResultsInfo>
            <p>
              No results found for <b>"{this.props.text}"</b>
            </p>
          </Styled.SearchResultsInfo>
        ) : null}
        <Styled.Container>
          {this.state.videos &&
            this.state.videos.map((data, idx) => (
              <Video
                {...data}
                selected={
                  !!this.props.curMapTarget &&
                  idx === 0 &&
                  data.title ===
                    this.props.curMapTarget["_additionalInformation"].match(
                      /(?<=<h2>)(.*)(?=<\/h2>)/gm
                    )[0]
                }
                key={ID_GENERATOR("video-")}
              />
            ))}
          {this.state.videos.length === 0 ? (
            this.props.isFetching ? (
              <Styled.SpinnerWrapper>
                <Spinner.Container>
                  <Spinner.SpinnerContainer>
                    <Spinner.SpinnerOverlay />
                  </Spinner.SpinnerContainer>
                </Spinner.Container>
              </Styled.SpinnerWrapper>
            ) : (
              <Styled.Help>
                <ul>
                  <li>
                    <h2>Help</h2>
                  </li>
                  {help.map(ele => (
                    <li key={ID_GENERATOR("cat-help")}>{ele}</li>
                  ))}
                  <li>
                    <b>HAVE FUN!</b>
                  </li>
                </ul>
                <Kitty />
              </Styled.Help>
            )
          ) : (
            <PageChanger
              forwardRef={this.myRef}
              videoLength={
                this.state.searchResults.length || this.props.videos.length || 1
              }
            />
          )}
        </Styled.Container>
        <Footer />
      </Styled.Wrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  videos: selectVideos,
  zoom: selectZoom,
  curMapTarget: selectCurMapTarget,
  order: selectOrder,
  sortBy: selectSortBy,
  text: selectDebouncedText,
  curPage: selectCurPage,
  routes: selectRoutes,
  isFetching: selectIsFetching,
})

const mapDispatchToProps = dispatch => ({
  clearVideos: () => dispatch(clearVideos()),
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer)
