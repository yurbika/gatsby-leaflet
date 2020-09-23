import MapActionTypes from "./map.types"

const INITIAL_STATE = {
  routes: null,
}

const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MapActionTypes.SET_CURRENT_ROUTES:
      return { ...state, routes: action.payload }
    default:
      return state
  }
}

export default mapReducer
