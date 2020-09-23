import { createSelector } from "reselect"

const selectMap = state => state.map

export const selectRoutes = createSelector([selectMap], map => map.routes)
