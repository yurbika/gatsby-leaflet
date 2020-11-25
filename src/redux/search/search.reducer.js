import SearchActionTypes from "./search.types"

const INTIAL_STATE = {
  order: true,
  sortBy: "",
}

const searchReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SearchActionTypes.SET_SORT_BY_AND_ORDER: {
      return {
        ...state,
        order: action.payload.order,
        sortBy: action.payload.sortBy,
      }
    }
    default:
      return state
  }
}

export default searchReducer
