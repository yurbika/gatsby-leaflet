import { createSelector } from "reselect"

const selectSearch = state => state.search

export const selectSortBy = createSelector(
  [selectSearch],
  search => search.sortBy
)

export const selectOrder = createSelector(
  [selectSearch],
  search => search.order
)

export const selectText = createSelector([selectSearch], search => search.text)

export const selectDebouncedText = createSelector(
  [selectSearch],
  search => search.debouncedText
)
