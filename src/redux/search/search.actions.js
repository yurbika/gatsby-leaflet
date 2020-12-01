import SearchActionTypes from "./search.types"
import debounce from "lodash.debounce"

export const setSortByAndOrder = obj => ({
  type: SearchActionTypes.SET_SORT_BY_AND_ORDER,
  payload: obj,
})

//this action is for the controlled component
export const setText = text => ({
  type: SearchActionTypes.SET_SEARCHTEXT,
  payload: text,
})

const setDebouncedText = text => ({
  type: SearchActionTypes.SET_DEBOUNCED_SEARCHTEXT,
  payload: text,
})

const innerFunction = debounce((dispatch, ...args) => {
  dispatch(setDebouncedText(...args))
}, 300)

//this action is for the sorting algorithm
export const setTextAsync = (...args) => dispatch =>
  innerFunction(dispatch, ...args)

export const resetDebouncedText = () => ({
  type: SearchActionTypes.RESET_DEBOUNCED_SEARCHTEXT,
})

export const clearSearchReducer = () => ({
  type: SearchActionTypes.CLEAR_SEARCH_REDUCER,
})
