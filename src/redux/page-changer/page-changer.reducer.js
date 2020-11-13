import PageChangerActionTypes from "./page-changer.types"

const INITIAL_STATE = {
  curPage: 0,
}

const pageChangerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PageChangerActionTypes.INCREMENT_PAGE:
      return { ...state, curPage: state.curPage + 1 }
    case PageChangerActionTypes.DECREMENT_PAGE:
      return { ...state, curPage: state.curPage - 1 }
    case PageChangerActionTypes.SET_PAGE:
      return { ...state, curPage: action.payload }
    case PageChangerActionTypes.RESET_PAGE:
      return { ...state, curPage: 0 }
    default:
      return state
  }
}

export default pageChangerReducer
