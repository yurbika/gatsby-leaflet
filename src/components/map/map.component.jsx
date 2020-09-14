import React, { Component } from "react"
import { Map, TileLayer, GeoJSON } from "react-leaflet"
import "leaflet-boundary-canvas"
import L from "leaflet"

//utils
import geojson from "./utils/geojson"

//styles
import "./map.styles.scss"

export default class MyMap extends Component {
  componentDidMount() {
    L.TileLayer.boundaryCanvas(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        boundary: geojson,
      }
    ).addTo(this.map.leafletElement)
  }

  render() {
    const position = [36.2048, 138.2529]

    if (typeof window !== "undefined") {
      return (
        <Map center={position} zoom={5} ref={Map => (this.map = Map)}>
          <GeoJSON data={geojson} />
        </Map>
      )
    }
    return null
  }
}
