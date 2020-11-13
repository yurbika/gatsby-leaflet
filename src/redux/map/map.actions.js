import MapActionTypes from "./map.types"
import { getData } from "../../components/video-container/utils/utils"

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

export const fetchVideosStartAsync = () => {
  return (dispatch, getState) => {
    const { routes } = getState().map
    const { curPage } = getState().pageChanger

    dispatch(fetchVideosStart())
    getData(routes.cur, curPage)
      .then(arr => dispatch(fetchVideosSuccess(arr)))
      .catch(err => dispatch(fetchVideosFailure(err)))
  }
}

export const clearVideos = () => ({
  type: MapActionTypes.CLEAR_VIDEOS,
})

export const setZoom = zoom => ({
  type: MapActionTypes.SET_ZOOM,
  payload: zoom,
})
