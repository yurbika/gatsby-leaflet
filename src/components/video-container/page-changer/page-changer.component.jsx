import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

//redux
import { selectCurPage } from "../../../redux/page-changer/page-changer.selectors"
import {
  incrementPage,
  decrementPage,
  setPage,
} from "../../../redux/page-changer/page-changer.actions"

import { resetVideoState } from "../../../redux/video/video.actions"

import { selectRoutes } from "../../../redux/map/map.selectors"
import { fetchVideosStartAsync } from "../../../redux/map/map.actions"

//assets
import Arrow from "../../../assets/arrow.svg"

//styles
import * as Styled from "./page-changer.styles"

const PageChanger = ({
  routes: { cur: totalRoutes },
  curPage,
  incrementPage,
  decrementPage,
  setPage,
  fetchVideosStartAsync,
  forwardRef,
  resetVideoState,
}) => {
  const totalPages = Math.ceil(totalRoutes.length / 10)
  const handleClick = () => {
    fetchVideosStartAsync()
    forwardRef.scroll(0, 0)
    resetVideoState()
  }
  return (
    <Styled.Container hidden={totalPages === 1}>
      <button
        onClick={() => {
          if (curPage - 1 >= 0) decrementPage()
          else setPage(totalPages - 1)
          handleClick()
        }}
      >
        <Arrow />
      </button>
      <button>
        <span>{curPage + 1 + " / " + totalPages}</span>
      </button>
      <button
        onClick={() => {
          if (curPage + 1 < totalPages) incrementPage()
          else setPage(0)
          handleClick()
        }}
      >
        <Arrow />
      </button>
    </Styled.Container>
  )
}

const mapStateToProps = createStructuredSelector({
  curPage: selectCurPage,
  routes: selectRoutes,
})

const mapDispatchToProps = dispatch => ({
  incrementPage: () => dispatch(incrementPage()),
  decrementPage: () => dispatch(decrementPage()),
  setPage: num => dispatch(setPage(num)),
  fetchVideosStartAsync: () => dispatch(fetchVideosStartAsync()),
  resetVideoState: () => dispatch(resetVideoState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageChanger)
