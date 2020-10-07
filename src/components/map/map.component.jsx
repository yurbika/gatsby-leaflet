import React, { Component } from "react"
import { Map, GeoJSON } from "react-leaflet"
import "leaflet-boundary-canvas"
import "leaflet-kml"
import L, { layerGroup } from "leaflet"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

//redux
import {
  setRoutes,
  fetchVideosStartAsync,
  setZoom,
} from "../../redux/map/map.actions"
import { selectRoutes, selectZoom } from "../../redux/map/map.selectors"

import { selectIsPlaying } from "../../redux/video/video.selectors"

//assets
import KML from "../../assets/routes.js"

//utils
import { border } from "./utils/border"

//styles
import "./map.styles.scss"
import * as Styled from "./map.styles"

//params
const parser = new DOMParser()
const kml = parser.parseFromString(KML, "text/xml")
let test
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
    this.map.leafletElement.on("moveend", () => this.handleMapActions())

    this.map.leafletElement.on("zoomend", () => {
      this.handleMapActions()
      if (!this.props.isPlaying)
        this.props.setZoom(this.map.leafletElement.getZoom())
    })

    this.map.leafletElement.on("update", () => this.handleMapActions())

    test = L.polyline(
      [
        { lat: 34.0695428, lng: 134.5514836 },
        { lat: 34.0710714, lng: 134.5523849 },
        { lat: 34.071538, lng: 134.5526531 },
        { lat: 34.0718002, lng: 134.5520254 },
        { lat: 34.0719912, lng: 134.5522615 },
        { lat: 34.0719646, lng: 134.5525994 },
        { lat: 34.0719468, lng: 134.5527496 },
        { lat: 34.0721556, lng: 134.5528569 },
        { lat: 34.0720445, lng: 134.5533129 },
        { lat: 34.0719512, lng: 134.5538493 },
        { lat: 34.0721068, lng: 134.5550241 },
        { lat: 34.0722801, lng: 134.5555499 },
        { lat: 34.0725244, lng: 134.5557913 },
        { lat: 34.0731599, lng: 134.5559415 },
        { lat: 34.0731999, lng: 134.5552226 },
        { lat: 34.0739197, lng: 134.5553567 },
        { lat: 34.0742263, lng: 134.5564725 },
        { lat: 34.0745151, lng: 134.5566657 },
        { lat: 34.0749506, lng: 134.5566013 },
        { lat: 34.075977, lng: 134.5566603 },
        { lat: 34.0764213, lng: 134.5562258 },
        { lat: 34.076408, lng: 134.5559361 },
        { lat: 34.0761858, lng: 134.555346 },
        { lat: 34.0765902, lng: 134.5535489 },
        { lat: 34.0767679, lng: 134.5526531 },
        { lat: 34.0756393, lng: 134.5520093 },
        { lat: 34.0755193, lng: 134.551607 },
        { lat: 34.0755637, lng: 134.5497402 },
        { lat: 34.0757148, lng: 134.5492359 },
        { lat: 34.075897, lng: 134.5488551 },
        { lat: 34.0752349, lng: 134.5484206 },
        { lat: 34.0744885, lng: 134.5500406 },
        { lat: 34.0740841, lng: 134.5501425 },
        { lat: 34.0739908, lng: 134.5503571 },
        { lat: 34.0737819, lng: 134.5505073 },
        { lat: 34.0736709, lng: 134.5507004 },
        { lat: 34.0736131, lng: 134.5508453 },
        { lat: 34.0734487, lng: 134.550738 },
        { lat: 34.0734531, lng: 134.5505502 },
        { lat: 34.0724045, lng: 134.5497348 },
        { lat: 34.072129, lng: 134.5494934 },
        { lat: 34.0715338, lng: 134.5509379 },
        { lat: 34.0710605, lng: 134.5505973 },
        { lat: 34.070985, lng: 134.5507958 },
      ],
      { className: "test", weight: "10", color: "red" }
    )
    test.addTo(this.map.leafletElement)
    L.marker({ lat: 34.070985, lng: 134.5507958 }).addTo(
      this.map.leafletElement
    )

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
    this.props.routes.on("mouseover", e => {
      this.handleInfoUpdate(
        e.sourceTarget["_additionalInformation"].match(
          /(?<=<h2>)(.*)(?=<\/h2>)/gm
        )[0],
        true
      )
      this.info.update()
    })
    console.log(document.getElementsByClassName("test")[0].getTotalLength())
    //polyline info
    this.props.routes.on("mouseout", () => {
      this.handleInfoUpdate()
      this.info.update()
    })
    //polyline/marker fit bounds
    this.props.routes.on("click", e => {
      if (e.sourceTarget.options.pane === "markerPane") {
        this.map.leafletElement.setView(e.latlng, 17)
      } else this.map.leafletElement.fitBounds(e.sourceTarget["_bounds"])
    })
    //updated map depending on view
    if (this.props.zoom >= this.zoomBreak) {
      this.map.leafletElement.removeLayer(this.boundaryMap)
      this.withoutBoundary.addTo(this.map.leafletElement)
      this.map.leafletElement.removeControl(this.legend)
      //show only in bounds routes
      this.map.leafletElement.addLayer(this.props.routes)
    } else if (this.props.zoom < this.zoomBreak) {
      this.map.leafletElement.removeLayer(this.withoutBoundary)
      this.boundaryMap.addTo(this.map.leafletElement)
      this.legend.addTo(this.map.leafletElement)
      //remove routes
      this.map.leafletElement.removeLayer(this.props.routes)
    }
  }

  //adding routes and async fetch of videos
  handleMapActions = () => {
    if (this.zoomBreak <= this.props.zoom && !this.props.isPlaying) {
      this.map.leafletElement.removeLayer(this.props.routes)
      this.props.setRoutes(
        new L.KML(kml, this.map.leafletElement.getBounds(), [])
      )
      this.props.fetchVideosStartAsync()
    }
  }

  handleHighlight = e => {
    var layer = e.target

    //hover effect
    if (this.props.zoom < this.zoomBreak) {
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
    if (this.props.zoom < this.zoomBreak)
      e.target.setStyle(this.handleGeoJsonStyles(e.target.feature))

    //remove infobox information
    this.handleInfoUpdate()
    this.info.update()
  }

  handleZoomToFeature = e => {
    this.map.leafletElement.fitBounds(e.target.getBounds())
  }

  handleInfoUpdate = (props, route = false) => {
    if (this.props.isPlaying) {
      this.info.update = function () {
        this._div.innerHTML =
          '<h4 class="info__heading warning">Pause the video to continue exploring</h4>'
      }
      this.info.update()
    }
    //show information about region or route
    else if (route) {
      this.info.update = function () {
        this._div.innerHTML =
          '<h4 class="info__heading">Route</h4>' + "<b>" + props + "</b>"
      }
    } else {
      this.info.update = function () {
        this._div.innerHTML =
          '<h4 class="info__heading">Region</h4>' +
          (props
            ? "<b>" + props.NAME + "</b><br />" + props.NAME_JP
            : "Hover over a region")
      }
    }
  }

  handleGeoJsonStyles = feature => {
    if (this.props.zoom >= this.zoomBreak)
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
        <Styled.SCMap
          center={position}
          maxBounds={bounds}
          minZoom={5}
          zoom={5}
          ref={Map => (this.map = Map)}
          test={
            test && document.getElementsByClassName("test")[0].getTotalLength()
          }
        >
          {this.props.zoom < this.zoomBreak ? (
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
          {this.props.zoom >= this.zoomBreak ? (
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
        </Styled.SCMap>
      )
    }
    return null
  }
}

const mapStateToProps = createStructuredSelector({
  routes: selectRoutes,
  isPlaying: selectIsPlaying,
  zoom: selectZoom,
})

const mapDispatchToProps = dispatch => ({
  setRoutes: arr => dispatch(setRoutes(arr)),
  fetchVideosStartAsync: () => dispatch(fetchVideosStartAsync()),
  setZoom: zoom => dispatch(setZoom(zoom)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyMap)
