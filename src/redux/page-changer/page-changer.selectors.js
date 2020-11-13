import { createSelector } from "reselect"

const selectPageChanger = state => state.pageChanger

export const selectCurPage = createSelector(
  [selectPageChanger],
  pageChanger => pageChanger.curPage
)
