import { createSelector } from "reselect"

const selectVideoState = state => state.video

export const selectIsPlaying = createSelector(
  [selectVideoState],
  video => video.isPlaying
)

export const selectVideoLatLngs = createSelector(
  [selectVideoState],
  video => video.latLngsArray
)

export const selectVideoCurTime = createSelector(
  [selectVideoState],
  video => video.curTime
)

export const selectVideoTotalLength = createSelector(
  [selectVideoState],
  video => video.totalLength
)

export const selectVideoID = createSelector(
  [selectVideoState],
  video => video.videoID
)
