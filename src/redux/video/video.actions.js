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

export const setVideoID = id => ({
  type: VideoActionTypes.SET_VIDEO_ID,
  payload: id,
})

export const setVideoPlaybackRate = num => ({
  type: VideoActionTypes.SET_VIDEO_PLAYBACKRATE,
  payload: num,
})
