import React from "react"

//assets
import Arrow from "../../../assets/arrow.svg"

//styles
import * as Styled from "./page-changer.styles"

const PageChanger = () => (
  <Styled.Container>
    <button>
      <Arrow />
    </button>
    <button>
      <span>1</span>
    </button>
    <button>
      <Arrow />
    </button>
  </Styled.Container>
)

export default PageChanger
