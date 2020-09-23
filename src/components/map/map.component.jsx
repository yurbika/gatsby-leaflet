import React, { Component } from "react"
import { Map, GeoJSON } from "react-leaflet"
import "leaflet-boundary-canvas"
import "leaflet-kml"
import L from "leaflet"
import { connect } from "react-redux"

//redux
import { setRoutes } from "../../redux/map/map.actions"

import { selectRoutes } from "../../redux/map/map.selectors"

//assets
import KML from "../../assets/routes.js"

//utils
import { border } from "./utils/border"

//styles
import "./map.styles.scss"
import { createStructuredSelector } from "reselect"

//params
const parser = new DOMParser()
const kml = parser.parseFromString(KML, "text/xml")

const chooseColor = d => {
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

class MyMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 5,
      bounds: {
        _northEast: { lat: 45.7112046, lng: 154.205541 },
        _southWest: { lat: 20.2145811, lng: 122.7141754 },
      },
      kml: kml,
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

    //map elements
    this.info = L.control()
    this.legend = L.control({ position: "bottomright" })
    this.zoomBreak = 8
  }

  componentDidMount() {
    //adding map
    this.boundaryMap.addTo(this.map.leafletElement)
    //adding extra pane for routes
    this.map.leafletElement.createPane("routes")
    //setting redux routes depending on boundaries
    this.map.leafletElement.on("moveend", () => {
      if (this.zoomBreak <= this.state.zoom) {
        this.map.leafletElement.removeLayer(this.props.routes)
        this.props.setRoutes(
          new L.KML(kml, this.map.leafletElement.getBounds(), [])
        )
      }
    })

    //initialize routes
    this.props.setRoutes(new L.KML(kml, this.state.bounds, []))

    //setting infobox
    this.info.onAdd = function (map) {
      this._div = L.DomUtil.create("div", "info")
      this.update()
      return this._div
    }
    this.handleInfoUpdate()
    this.info.addTo(this.map.leafletElement)

    //set legend infos
    this.legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info legend"),
        code = [1, 7, 14, 23, 30, 35, 39, 47],
        labels = [
          "Hokkaido",
          "Tohoku",
          "Kanto",
          "Chubu",
          "Kansai",
          "Chugoku",
          "Shikoku",
          "Kyushu and Okinawa",
        ]

      for (var i = 0; i < code.length; i++) {
        div.innerHTML +=
          '<i style="background: ' +
          chooseColor(code[i]) +
          '" class="legend__color"></i> ' +
          "" +
          labels[i] +
          "<br>"
      }

      return div
    }
    this.legend.addTo(this.map.leafletElement)
  }

  componentDidUpdate() {
    //add or remove elements from map

    if (this.state.zoom >= this.zoomBreak) {
      this.map.leafletElement.removeLayer(this.boundaryMap)
      this.withoutBoundary.addTo(this.map.leafletElement)
      this.map.leafletElement.removeControl(this.legend)
      //show only in bounds routes
      this.map.leafletElement.addLayer(this.props.routes)
    } else if (this.state.zoom < this.zoomBreak) {
      this.map.leafletElement.removeLayer(this.withoutBoundary)
      this.boundaryMap.addTo(this.map.leafletElement)
      this.legend.addTo(this.map.leafletElement)
      //remove routes
      this.map.leafletElement.removeLayer(this.props.routes)
    }
  }

  handleHighlight = e => {
    var layer = e.target

    //hover effect
    if (this.state.zoom < this.zoomBreak) {
      layer.setStyle({
        fillColor: "#BF0436",
        weight: 1,
        color: "#fff",
        fillOpacity: 1,
      })
    }

    //show information in the infobox
    this.handleInfoUpdate(layer.feature.properties)
    this.info.update()

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront()
    }
  }

  handleClearHighlight = e => {
    //remove hover color
    if (this.state.zoom < this.zoomBreak)
      e.target.setStyle(this.handleGeoJsonStyles(e.target.feature))

    //remove infobox information
    this.handleInfoUpdate()
    this.info.update()
  }

  handleZoomToFeature = e => {
    this.map.leafletElement.fitBounds(e.target.getBounds())
  }

  handleInfoUpdate = props => {
    this.info.update = function () {
      this._div.innerHTML =
        '<h4 class="info__heading">Region</h4>' +
        (props
          ? "<b>" + props.NAME + "</b><br />" + props.NAME_JP
          : "Hover over a region")
    }
  }

  handleGeoJsonStyles = feature => {
    if (this.state.zoom >= this.zoomBreak)
      return {
        fillColor: "#fff",
        weight: 1,
        opacity: 0,
        color: "#000",
        fillOpacity: 0,
      }
    return {
      fillColor: chooseColor(feature.properties.CODE),
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
          }}
        >
          {this.state.zoom < this.zoomBreak ? (
            <GeoJSON
              data={border}
              onEachFeature={(f, l) => {
                l.on({
                  mouseover: this.handleHighlight,
                  mouseout: this.handleClearHighlight,
                  click: this.handleZoomToFeature,
                })
              }}
              style={feature => this.handleGeoJsonStyles(feature)}
            />
          ) : null}
          {this.state.zoom >= this.zoomBreak ? (
            <GeoJSON
              data={border}
              style={feature => this.handleGeoJsonStyles(feature)}
              onEachFeature={(f, l) => {
                l.on({
                  mouseover: this.handleHighlight,
                  mouseout: this.handleClearHighlight,
                })
              }}
            />
          ) : null}
        </Map>
      )
    }
    return null
  }
}

const mapStateToProps = createStructuredSelector({
  routes: selectRoutes,
})

const mapDispatchToProps = dispatch => ({
  setRoutes: arr => dispatch(setRoutes(arr)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyMap)
