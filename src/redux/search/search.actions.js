import SearchActionTypes from "./search.types"

export const setSortByAndOrder = obj => ({
  type: SearchActionTypes.SET_SORT_BY_AND_ORDER,
  payload: obj,
})
