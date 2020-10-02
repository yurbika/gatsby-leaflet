import { createSelector } from "reselect"

const selectVideoState = state => state.video

export const selectIsPlaying = createSelector(
  [selectVideoState],
  video => video.isPlaying
)
