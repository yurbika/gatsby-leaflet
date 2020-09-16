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
      "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        boundary: border,
      }
    )
    this.withoutBoundary = L.TileLayer.boundaryCanvas(
      "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    )

    this.info = L.control()
  }

  componentDidMount() {
    this.boundaryMap.addTo(this.map.leafletElement)
    this.info.onAdd = function (map) {
      this._div = L.DomUtil.create("div", "info") // create a div with a class "info"
      this.update()
      return this._div
    }
    this.infoUpdate()
    this.info.addTo(this.map.leafletElement)
  }
  componentDidUpdate() {
    if (this.state.zoom >= 8) {
      this.map.leafletElement.removeLayer(this.boundaryMap)
      this.withoutBoundary.addTo(this.map.leafletElement)
    } else if (this.state.zoom < 8) {
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
    this.infoUpdate(layer.feature.properties)
    this.info.update()

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront()
    }
  }

  clearHighlight = e => {
    e.target.setStyle(this.geoJsonStyles(e.target.feature))
    this.infoUpdate()
    this.info.update()
  }

  zoomToFeature = e => {
    this.map.leafletElement.fitBounds(e.target.getBounds())
  }

  infoUpdate = props => {
    this.info.update = function () {
      this._div.innerHTML =
        '<h4 class="info__heading">Region</h4>' +
        (props
          ? "<b>" + props.NAME + "</b><br />" + props.NAME_JP
          : "Hover over a region")
    }
  }

  chooseColor = d => {
    return d >= 2 && d <= 7
      ? "#0D65D9"
      : d > 7 && d <= 14
      ? "#97DAE8"
      : d > 14 && d <= 23
      ? "#259E63"
      : d > 23 && d <= 30
      ? "#7AC200"
      : d > 30 && d <= 35
      ? "#FAE200"
      : d > 35 && d <= 39
      ? "#F2B407"
      : d > 39 && d <= 47
      ? "#FF8000"
      : "#1E0091"
  }

  geoJsonStyles = (feature, boundary = false) => {
    if (boundary)
      return {
        fillColor: "#fff",
        weight: 1,
        opacity: 0.4,
        color: "#000",
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
          zoom={5}
          ref={Map => (this.map = Map)}
          onzoomend={() => {
            this.setState({ zoom: this.map.leafletElement.getZoom() })
            console.log(this.state.zoom)
          }}
        >
          {this.state.zoom < 8 ? (
            <GeoJSON
              data={border}
              onEachFeature={(f, l) => {
                l.on({
                  mouseover: this.highlight,
                  mouseout: this.clearHighlight,
                  click: this.zoomToFeature,
                })
              }}
              style={feature => this.geoJsonStyles(feature)}
            />
          ) : null}
          {this.state.zoom >= 8 ? (
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
