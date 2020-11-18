import MapActionTypes from "./map.types"

const INITIAL_STATE = {
  routes: null,
  videos: [],
  errMsg: "",
  isFetching: false,
  zoom: 5,
  mapRef: null,
  curMapTarget: null,
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
    case MapActionTypes.SET_MAP_REF:
      return { ...state, mapRef: action.payload }
    case MapActionTypes.SET_CUR_MAP_TARGET:
      return { ...state, curMapTarget: action.payload }
    default:
      return state
  }
}

export default mapReducer
