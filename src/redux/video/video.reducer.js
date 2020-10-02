import VideoActionTypes from "./video.types"

const INTIAL_STATE = {
  isPlaying: false,
}

const videoReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case VideoActionTypes.SET_VIDEO_IS_PLAYING:
      return { ...state, isPlaying: !state.isPlaying }
    default:
      return state
  }
}

export default videoReducer
