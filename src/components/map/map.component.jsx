import React, { Component } from "react"
import { Map, GeoJSON } from "react-leaflet"
import "leaflet-boundary-canvas"
import L from "leaflet"

//utils
import { border } from "./utils/border"

//styles
import "./map.styles.scss"

export default class MyMap extends Component {
  constructor() {
    super()
    this.state = {
      zoom: 5,
    }
    this.boundaryMap = L.TileLayer.boundaryCanvas(
      "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        boundary: border,
      }
    )
    this.withoutBoundary = L.TileLayer.boundaryCanvas(
      "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    )
  }

  componentDidMount() {
    this.boundaryMap.addTo(this.map.leafletElement)
  }
  componentDidUpdate() {
    if (this.state.zoom >= 10) {
      this.map.leafletElement.removeLayer(this.boundaryMap)
      this.withoutBoundary.addTo(this.map.leafletElement)
    } else if (this.state.zoom < 10) {
      this.map.leafletElement.removeLayer(this.withoutBoundary)
      this.boundaryMap.addTo(this.map.leafletElement)
    }
  }
  highlight = e => {
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

  clearHighlight = e => {
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

  geoJsonStyles = (feature, boundary = false) => {
    if (boundary)
      return {
        fillColor: "#fff",
        weight: 1,
        opacity: 0.5,
        color: "black",
        fillOpacity: 0.3,
      }
    return {
      fillColor: this.chooseColor(feature.properties.CODE),
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 1,
    }
  }

  render() {
    const position = [35.652832, 139.839478]
    const northEast = L.latLng(45.7112046, 154.205541),
      southWest = L.latLng(20.2145811, 122.7141754),
      bounds = L.latLngBounds(southWest, northEast)

    if (typeof window !== "undefined") {
      return (
        <Map
          center={position}
          maxBounds={bounds}
          minZoom={5}
          maxZoom={17}
          zoom={5}
          ref={Map => (this.map = Map)}
          onzoomend={() => {
            this.setState({ zoom: this.map.leafletElement.getZoom() })
            console.log(this.state.zoom)
          }}
        >
          {this.state.zoom < 10 ? (
            <GeoJSON
              data={border}
              onEachFeature={(f, l) => {
                l.on({
                  mouseover: this.highlight,
                  mouseout: this.clearHighlight,
                })
              }}
              style={feature => this.geoJsonStyles(feature)}
            />
          ) : null}
          {this.state.zoom >= 10 ? (
            <GeoJSON
              data={border}
              style={feature => this.geoJsonStyles(feature, true)}
            />
          ) : null}
        </Map>
      )
    }
    return null
  }
}
