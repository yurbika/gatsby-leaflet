import { combineReducers } from "redux"

import mapReducer from "./map/map.reducer"
import videoReducer from "./video/video.reducer"
import pageChangerReducer from "./page-changer/page-changer.reducer"

export default combineReducers({
  map: mapReducer,
  video: videoReducer,
  pageChanger: pageChangerReducer,
})
