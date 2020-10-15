import VideoActionTypes from "./video.types"

const INTIAL_STATE = {
  isPlaying: false,
  latLngsArray: [],
  curTime: 0,
  totalLength: 0,
  videoID: "",
}

const videoReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case VideoActionTypes.SET_VIDEO_IS_PLAYING:
      return { ...state, isPlaying: action.payload }
    case VideoActionTypes.SET_VIDEO_LAT_LNGS:
      return { ...state, latLngsArray: action.payload }
    case VideoActionTypes.SET_VIDEO_TOTAL_LENGTH:
      return { ...state, totalLength: action.payload }
    case VideoActionTypes.SET_VIDEO_CUR_TIME:
      return { ...state, curTime: action.payload }
    case VideoActionTypes.SET_VIDEO_ID:
      return { ...state, videoID: action.payload }
    default:
      return state
  }
}

export default videoReducer
