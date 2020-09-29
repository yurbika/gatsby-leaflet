import { createSelector } from "reselect"

const selectMap = state => state.map

export const selectRoutes = createSelector([selectMap], map => map.routes)

export const selectVideos = createSelector([selectMap], map => map.videos)

export const selectIsFetching = createSelector(
  [selectMap],
  map => map.isFetching
)
