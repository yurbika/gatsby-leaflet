import { createSelector } from "reselect"

const selectMap = state => state.map

export const selectRoutes = createSelector([selectMap], map => map.routes)

export const selectVideos = createSelector([selectMap], map => map.videos)

export const selectIsFetching = createSelector(
  [selectMap],
  map => map.isFetching
)

export const selectZoom = createSelector([selectMap], map => map.zoom)

export const selectMapRef = createSelector([selectMap], map => map.mapRef)

export const selectCurMapTarget = createSelector(
  [selectMap],
  map => map.curMapTarget
)
