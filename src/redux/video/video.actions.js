import VideoActionTypes from "./video.types"

export const setVideoIsPlaying = isPlaying => ({
  type: VideoActionTypes.SET_VIDEO_IS_PLAYING,
  payload: isPlaying,
})

export const setVideoLatLngs = array => ({
  type: VideoActionTypes.SET_VIDEO_LAT_LNGS,
  payload: array,
})

export const setVideoTotalLength = time => ({
  type: VideoActionTypes.SET_VIDEO_TOTAL_LENGTH,
  payload: time,
})

export const setVideoCurTime = time => ({
  type: VideoActionTypes.SET_VIDEO_CUR_TIME,
  payload: time,
})
