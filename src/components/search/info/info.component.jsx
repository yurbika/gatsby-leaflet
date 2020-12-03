import React, { useState } from "react"

//assets
import Information from "./help"
import Arrow from "../../../assets/arrow.svg"

//utils
import ID_GENERATOR from "../../../uniqueKey"

//styles
import * as Styled from "./info.styles"

const Info = ({ expand, onFocus, onBlur }) => {
  const [page, setPage] = useState(0)
  const maxInfos = 4
  const totalPages = Math.ceil(Information.length / maxInfos)
  let arr = Information.slice(page * maxInfos, maxInfos * page + maxInfos)
  return (
    <Styled.Container expand={expand}>
      <Styled.Ul>
        <li>
          <h2>Help</h2>
        </li>
        {arr.map(ele => (
          <li key={ID_GENERATOR("help-")}>{ele}</li>
        ))}
      </Styled.Ul>
      <Styled.PageChanger hidden={totalPages <= 1}>
        <button
          onClick={() => {
            if (page - 1 >= 0) setPage(page - 1)
            else setPage(totalPages)
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <Arrow />
        </button>
        <span>{page + 1 + " / " + totalPages}</span>
        <button
          onClick={() => {
            if (page + 1 < totalPages) setPage(page + 1)
            else setPage(0)
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <Arrow />
        </button>
      </Styled.PageChanger>
    </Styled.Container>
  )
}

export default Info
