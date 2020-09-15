import React, { Component } from "react"
import { Map, GeoJSON } from "react-leaflet"
import "leaflet-boundary-canvas"
import L from "leaflet"

//utils
import { border } from "./utils/border"

//styles
import "./map.styles.scss"

export default class MyMap extends Component {
  componentDidMount() {
    L.TileLayer.boundaryCanvas(
      "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        boundary: border,
      }
    ).addTo(this.map.leafletElement)
  }
  test = e => {
    var layer = e.target

    layer.setStyle({
      fillColor: "red",
      weight: 1,
      color: "#fff",
      fillOpacity: 1,
    })

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront()
    }
  }
  test2 = e => {
    e.target.setStyle(this.geoJsonStyles(e.target.feature))
  }
  chooseColor = d => {
    return d >= 2 && d <= 7
      ? "#F20505"
      : d > 7 && d <= 14
      ? "#F24B6A"
      : d > 14 && d <= 23
      ? "#73020C"
      : d > 23 && d <= 30
      ? "#BF0413"
      : d > 30 && d <= 35
      ? "#A6A6A6"
      : d > 35 && d <= 39
      ? "#BFBFBF"
      : d > 39 && d <= 47
      ? "#D9D9D9"
      : "#8C8C8C"
  }
  geoJsonStyles = feature => {
    return {
      fillColor: this.chooseColor(feature.properties.CODE),
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 1,
    }
  }
  render() {
    const position = [36.2048, 138.2529]

    if (typeof window !== "undefined") {
      return (
        <Map center={position} zoom={5} ref={Map => (this.map = Map)}>
          <GeoJSON
            data={border}
            onEachFeature={(f, l) => {
              l.on({
                mouseover: this.test,
                mouseout: this.test2,
              })
            }}
            style={feature => this.geoJsonStyles(feature)}
          />
        </Map>
      )
    }
    return null
  }
}
