import MapActionTypes from "./map.types"

const INITIAL_STATE = {
  routes: null,
  videos: [],
  errMsg: "",
  isFetching: false,
  zoom: 5,
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
    case MapActionTypes.CLEAR_VIDEOS:
      return { ...state, videos: [] }
    case MapActionTypes.SET_ZOOM:
      return { ...state, zoom: action.payload }
    default:
      return state
  }
}

export default mapReducer
