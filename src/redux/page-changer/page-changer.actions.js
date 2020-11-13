import PageChangerActionTypes from "./page-changer.types"

export const incrementPage = () => ({
  type: PageChangerActionTypes.INCREMENT_PAGE,
})

export const decrementPage = () => ({
  type: PageChangerActionTypes.DECREMENT_PAGE,
})

export const setPage = num => ({
  type: PageChangerActionTypes.SET_PAGE,
  payload: num,
})

export const resetPage = () => ({
  type: PageChangerActionTypes.RESET_PAGE,
})
