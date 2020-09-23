import MapActionTypes from "./map.types"

export const setRoutes = arr => ({
  type: MapActionTypes.SET_CURRENT_ROUTES,
  payload: arr,
})
