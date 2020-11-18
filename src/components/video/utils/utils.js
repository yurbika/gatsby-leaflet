import * as d3 from "d3"
import L from "leaflet"

export const createPolyline = (latLngs, map) => {
  let svg = d3.select(map.getPanes()["routes"]).select("svg")

  let toLine = d3
    .line()
    .x(d => map.latLngToLayerPoint(d).x)
    .y(d => map.latLngToLayerPoint(d).y)
}
