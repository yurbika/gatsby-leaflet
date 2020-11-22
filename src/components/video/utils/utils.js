import * as d3 from "d3"
import L from "leaflet"

export const deletePolyline = map => {
  d3.select(map.getPanes()["focusedRoute"]).select("svg").remove()
}

export const createPolyline = (points, map) => {
  //edge cases
  if (!!!points || (points && points.length === 0) || !!!map) return
  d3.select(map.getPanes()["focusedRoute"]).select("svg").remove()
  let svg = d3.select(map.getPanes()["focusedRoute"]).append("svg")
  let g = svg.append("g").attr("class", "leaflet-zoom-hide")

  //functions for creation
  let toLine = d3
    .line()
    .x(d => map.latLngToLayerPoint(d).x)
    .y(d => map.latLngToLayerPoint(d).y)

  let linePath = g
    .selectAll(".lineConnect")
    .data([points])
    .enter()
    .append("path")
    .attr("class", "lineConnect")
    .style("fill", "none")
    .style("stroke", "rgba(191, 4, 54, 0.65)")
    .style("stroke-width", "10px")
    .style("stroke-linecap", "round")
    .style("stroke-linejoin", "round")

  map.on("zoom", reset)
  reset()

  function reset() {
    let sw = L.polyline(points).getBounds()["_southWest"]
    let ne = L.polyline(points).getBounds()["_northEast"]
    let bottomRight = map.latLngToLayerPoint(sw)
    let topLeft = map.latLngToLayerPoint(ne)

    svg
      .attr("width", Math.abs(bottomRight.x - topLeft.x) + 20)
      .attr("height", Math.abs(bottomRight.y - topLeft.y) + 20)
      .style("left", bottomRight.x - 10 + "px")
      .style("top", topLeft.y - 10 + "px")
      .style("pointer-events", "none")

    linePath.attr("d", toLine)
    g.attr(
      "transform",
      "translate(" + (-bottomRight.x + 10) + "," + (-topLeft.y + 10) + ")"
    )
  }
}
