import React, { useState } from "react"
import YouTube from "react-youtube"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

//components
import WithSpinner from "../../components/with-spinner/with-spinner.component"

//redux
import { selectIsFetching } from "../../redux/map/map.selectors"

//styles
import "./video.styles.scss"
import * as Styled from "./video.styles"

const YoutubeWithSpinner = WithSpinner(YouTube)

const Video = ({
  h1: title,
  id,
  km,
  videoLength,
  description,
  date,
  isLoading,
}) => {
  const [expand, setExpand] = useState(false)
  const _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }
  return (
    <Styled.Container>
      <Styled.EmbedContainer>
        <YoutubeWithSpinner
          isLoading={isLoading}
          videoId={id[0]}
          onReady={_onReady}
          className="embed-container__iframe"
        />
      </Styled.EmbedContainer>
      <Styled.InfoBox>
        <h2>{title}</h2>
        <Styled.InfoBox__Description expand={expand}>
          {description}
        </Styled.InfoBox__Description>
        <ul>
          <li>
            <b>KM:</b> {!!km ? km : "-"}
          </li>
          <li>
            <b>Duration:</b> {videoLength}
          </li>
          <li>
            <b>Date:</b> {date}
          </li>
        </ul>
        <Styled.Button onClick={() => setExpand(!expand)}>
          <span>{expand ? "VIEW LESS" : "VIEW MORE"}</span>
        </Styled.Button>
      </Styled.InfoBox>
    </Styled.Container>
  )
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetching,
})

export default connect(mapStateToProps)(Video)
