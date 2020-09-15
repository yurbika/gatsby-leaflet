import React, { Component } from "react"
import { Map, TileLayer, GeoJSON, MapLayer } from "react-leaflet"
import "leaflet-boundary-canvas"
import L from "leaflet"

//utils
import geojson from "./utils/geojson"
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
      }
    ).addTo(this.map.leafletElement)
  }

  render() {
    const position = [36.2048, 138.2529]

    if (typeof window !== "undefined") {
      return (
        <Map center={position} zoom={5} ref={Map => (this.map = Map)}>
          <GeoJSON data={border} />
        </Map>
      )
    }
    return null
  }
}
