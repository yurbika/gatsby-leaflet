import VideoActionTypes from "./video.types"

export const setVideoIsPlaying = isPlaying => ({
  type: VideoActionTypes.SET_VIDEO_IS_PLAYING,
  payload: isPlaying,
})
