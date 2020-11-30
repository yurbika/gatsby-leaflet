import SearchActionTypes from "./search.types"

const INTIAL_STATE = {
  order: true,
  sortBy: "",
  text: "",
  debouncedText: "",
}

const searchReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SearchActionTypes.SET_SORT_BY_AND_ORDER:
      return {
        ...state,
        order: action.payload.order,
        sortBy: action.payload.sortBy,
      }
    case SearchActionTypes.SET_SEARCHTEXT:
      return {
        ...state,
        text: action.payload,
      }
    case SearchActionTypes.SET_DEBOUNCED_SEARCHTEXT:
      return {
        ...state,
        debouncedText: action.payload,
      }
    case SearchActionTypes.RESET_DEBOUNCED_SEARCHTEXT:
      return {
        ...state,
        debouncedText: "",
      }
    default:
      return state
  }
}

export default searchReducer
