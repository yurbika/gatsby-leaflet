import MapActionTypes from "./map.types"

const INITIAL_STATE = {
  routes: null,
  videos: [],
  errMsg: "",
  isFetching: false,
}

const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MapActionTypes.SET_CURRENT_ROUTES:
      return { ...state, routes: action.payload }
    case MapActionTypes.FETCH_VIDEOS_START:
      return { ...state, isFetching: true }
    case MapActionTypes.FETCH_VIDEOS_SUCCESS:
      return { ...state, videos: action.payload, isFetching: false }
    case MapActionTypes.FETCH_VIDEOS_FAILURE:
      return { ...state, errMsg: action.payload, isFetching: false }
    default:
      return state
  }
}

export default mapReducer
