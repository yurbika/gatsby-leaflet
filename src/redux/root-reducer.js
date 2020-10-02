import { combineReducers } from "redux"

import mapReducer from "./map/map.reducer"
import videoReducer from "./video/video.reducer"

export default combineReducers({
  map: mapReducer,
  video: videoReducer,
})
