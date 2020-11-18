import MapActionTypes from "./map.types"
import {
  getData,
  sortVideos,
} from "../../components/video-container/utils/utils"
import debounce from "lodash.debounce"

export const setRoutes = arr => ({
  type: MapActionTypes.SET_CURRENT_ROUTES,
  payload: arr,
})

export const fetchVideosStart = () => ({
  type: MapActionTypes.FETCH_VIDEOS_START,
})

export const fetchVideosSuccess = arr => ({
  type: MapActionTypes.FETCH_VIDEOS_SUCCESS,
  payload: arr,
})

export const fetchVideosFailure = errMsg => ({
  type: MapActionTypes.FETCH_VIDEOS_FAILURE,
  payload: errMsg,
})

const fetchVideosStartAsyncDebounced = debounce(
  (dispatch, getState) => {
    const { routes, curMapTarget } = getState().map
    const { curPage } = getState().pageChanger
    //if a route gets clicked it will be placed on the first idx
    if (curMapTarget !== null) {
      let sortedArr = sortVideos(curMapTarget, routes.cur)
      if (sortedArr !== null) {
        routes.cur = sortedArr
        dispatch(setCurMapTarget(null))
        dispatch(setRoutes(routes))
        dispatch(fetchVideosStartAsync())
      }
    }
    //otherwise just do a fetch videos in random order
    dispatch(fetchVideosStart())
    getData(routes.cur, curPage)
      .then(arr => dispatch(fetchVideosSuccess(arr)))
      .catch(err => dispatch(fetchVideosFailure(err)))
  },
  750,
  { leading: false, trailing: true }
)

export const fetchVideosStartAsync = () => fetchVideosStartAsyncDebounced

export const clearVideos = () => ({
  type: MapActionTypes.CLEAR_VIDEOS,
})

export const setZoom = zoom => ({
  type: MapActionTypes.SET_ZOOM,
  payload: zoom,
})

export const setMapRef = ref => ({
  type: MapActionTypes.SET_MAP_REF,
  payload: ref,
})

export const setCurMapTarget = obj => ({
  type: MapActionTypes.SET_CUR_MAP_TARGET,
  payload: obj,
})
