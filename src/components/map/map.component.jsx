import React, { Component } from "react"

import { GeoJSON } from "react-leaflet"
import "leaflet-boundary-canvas"
import "leaflet-kml"
import L from "leaflet"

import {
  animatePolyline,
  deleteAnimatedPolyline,
} from "./utils/animate-polyline"

import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

//redux
import {
  setRoutes,
  fetchVideosStartAsync,
  setZoom,
  setMapRef,
  clearVideos,
  setCurMapTarget,
} from "../../redux/map/map.actions"
import { selectRoutes, selectZoom } from "../../redux/map/map.selectors"
import { setPage } from "../../redux/page-changer/page-changer.actions"

import {
  selectIsPlaying,
  selectVideoLatLngs,
  selectVideoCurTime,
  selectVideoTotalLength,
  selectPlaybackRate,
} from "../../redux/video/video.selectors"

import { setVideoIsPlaying } from "../../redux/video/video.actions"

//assets
import KML from "../../assets/routes.js"

//utils
import { border } from "./utils/border"

//styles
import "font-awesome/css/font-awesome.min.css"
import * as Styled from "./map.styles"

//params
let parser
let kml
if (typeof window !== `undefined`) {
  parser = new DOMParser()
  kml = parser.parseFromString(KML, "text/xml")
}
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
    //setting ref
    this.props.setMapRef(this.map.leafletElement)
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
    //animate polyline on video play
    this.map.leafletElement.createPane("animatedRoute")

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
    if (this.props.isPlaying)
      animatePolyline(
        this.map.leafletElement,
        this.props.videoLatLngs,
        this.props.videoCurTime,
        this.props.videoTotalLength,
        this.props.videoPlaybackRate
      )
    else deleteAnimatedPolyline(this.map.leafletElement)
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
      //setting current route click
      this.props.setCurMapTarget(e.sourceTarget)
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

  componentWillUnmount() {
    this.props.setZoom(5)
    this.props.setVideoIsPlaying(false)
    this.props.clearVideos()
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
    this.props.setPage(0)
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
    const position = [34.0752, 134.5544]
    //[35.652832, 139.839478]
    const northEast = L.latLng(45.7112046, 154.205541),
      southWest = L.latLng(20.2145811, 122.7141754),
      bounds = L.latLngBounds(southWest, northEast)
    const attribution =
      '© <a href="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}">google</a> contributors'

    if (typeof window !== "undefined") {
      return (
        <Styled.SCMap
          center={position}
          maxBounds={bounds}
          minZoom={5}
          zoom={5}
          ref={Map => (this.map = Map)}
          isPlaying={this.props.isPlaying}
          style={{ background: "#bbe2f2" }}
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
              attribution={attribution}
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
              attribution={attribution}
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
  videoLatLngs: selectVideoLatLngs,
  videoCurTime: selectVideoCurTime,
  videoTotalLength: selectVideoTotalLength,
  videoPlaybackRate: selectPlaybackRate,
})

const mapDispatchToProps = dispatch => ({
  setRoutes: arr => dispatch(setRoutes(arr)),
  fetchVideosStartAsync: () => dispatch(fetchVideosStartAsync()),
  setZoom: zoom => dispatch(setZoom(zoom)),
  setVideoIsPlaying: bool => dispatch(setVideoIsPlaying(bool)),
  clearVideos: () => dispatch(clearVideos()),
  setPage: num => dispatch(setPage(num)),
  setMapRef: ref => dispatch(setMapRef(ref)),
  setCurMapTarget: obj => dispatch(setCurMapTarget(obj)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyMap)
