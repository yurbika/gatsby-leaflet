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

import { selectVideos } from "../../../redux/map/map.selectors"

//assets
import Arrow from "../../../assets/arrow.svg"

//utils
import CONSTANTS from "../../../constants/constants"

//styles
import * as Styled from "./page-changer.styles"

const PageChanger = ({
  videos,
  curPage,
  incrementPage,
  decrementPage,
  setPage,
  forwardRef,
  resetVideoState,
  videoLength,
}) => {
  const totalPages = Math.min(
    Math.ceil(videoLength / CONSTANTS.maxVideos),
    Math.ceil(videos.length / CONSTANTS.maxVideos)
  )
  const handleClick = () => {
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
  videos: selectVideos,
})

const mapDispatchToProps = dispatch => ({
  incrementPage: () => dispatch(incrementPage()),
  decrementPage: () => dispatch(decrementPage()),
  setPage: num => dispatch(setPage(num)),
  resetVideoState: () => dispatch(resetVideoState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageChanger)
