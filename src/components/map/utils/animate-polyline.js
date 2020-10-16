import * as d3 from "d3"
import L from "leaflet"

export const deleteAnimatedPolyline = map => {
  d3.select(map.getPanes()["animatedRoute"]).select("svg").remove()
}

export const animatePolyline = (
  map,
  points,
  curTime,
  totalLength,
  playebackRate
) => {
  //edge cases
  if (!!!points || (points && points.length === 0) || !!!map) return
  if (playebackRate > 2 || playebackRate < 0.25 || !!!playebackRate)
    playebackRate = 1

  //fallback value to 30 min
  if (totalLength === 0 || totalLength < 0 || !!!totalLength)
    totalLength = 1800000

  if (curTime <= 0 || !!!curTime) curTime = 0

  //variables
  let progress = curTime / totalLength
  let startPathAt = 0
  let ended = false

  d3.select(map.getPanes()["animatedRoute"]).select("svg").remove()
  let svg = d3.select(map.getPanes()["animatedRoute"]).append("svg")
  let g = svg.append("g").attr("class", "leaflet-zoom-hide")

  //functions to create
  let toLine = d3
    .line()
    .x(d => map.latLngToLayerPoint(d).x)
    .y(d => map.latLngToLayerPoint(d).y)

  let ptFeatures = g
    .selectAll("circle")
    .data(points)
    .enter()
    .append("circle")
    .attr("r", 3)
    .attr("class", "waypoints")
    .style("visibility", "hidden")

  let marker = g
    .append("text")
    .attr("font-family", "FontAwesome")
    .attr("id", "marker")
    .attr("x", -10)
    .attr("y", 6)
    .attr("class", "travelMarker")
    .style("font-size", "20px")
    .text(function (d) {
      return "\uf083"
    })

  let linePath = g
    .selectAll(".lineConnect")
    .data([points])
    .enter()
    .append("path")
    .attr("class", "lineConnect")
    .style("fill", "none")
    .style("stroke", "rgba(0,0,0,0.3)")
    .style("stroke-width", "5px")

  let originANDdestination = [points[0], points[points.length - 1]]

  function applyLatLngToLayer(d) {
    return map.latLngToLayerPoint(d)
  }

  let begend = g
    .selectAll(".drinks")
    .data(originANDdestination)
    .enter()
    .append("circle", ".drinks")
    .attr("r", 5)
    .style("fill", "#bf0436")

  map.on("zoom", reset)

  // this puts stuff on the map!
  reset()
  transition()

  function reset() {
    let sw = L.polyline(points).getBounds()["_southWest"]
    let ne = L.polyline(points).getBounds()["_northEast"]
    let bottomRight = map.latLngToLayerPoint(sw)
    let topLeft = map.latLngToLayerPoint(ne)

    begend.attr("transform", function (d) {
      return (
        "translate(" +
        applyLatLngToLayer(d).x +
        "," +
        applyLatLngToLayer(d).y +
        ")"
      )
    })

    ptFeatures.attr("transform", function (d) {
      return (
        "translate(" +
        applyLatLngToLayer(d).x +
        "," +
        applyLatLngToLayer(d).y +
        ")"
      )
    })
    if (ended)
      marker.attr(
        "transform",
        "translate(" +
          map.latLngToLayerPoint(points[points.length - 1]).x +
          "," +
          map.latLngToLayerPoint(points[points.length - 1]).y +
          ")"
      )

    svg
      .attr("width", Math.abs(bottomRight.x - topLeft.x) + 20)
      .attr("height", Math.abs(bottomRight.y - topLeft.y) + 20)
      .style("left", bottomRight.x - 10 + "px")
      .style("top", topLeft.y - 10 + "px")
      .style("pointer-events", "none")

    linePath.attr("d", toLine)
    startPathAt = linePath.node().getTotalLength() * progress
    g.attr(
      "transform",
      "translate(" + (-bottomRight.x + 10) + "," + (-topLeft.y + 10) + ")"
    )
  }
  //end reset

  function transition() {
    linePath
      .transition()
      .duration(totalLength)
      .attrTween("stroke-dasharray", tweenDash)
      .ease(d3.easeLinear)
      .on("end", function () {
        ended = true
        d3.select(this).attr("stroke-dasharray", null)
        d3.select("#marker").remove()
      })
  }
  //end transition

  function tweenDash() {
    return function (t) {
      let l = linePath.node().getTotalLength()

      // start at specific point
      let interpolate = d3.interpolateString(
        startPathAt + "," + (l * playebackRate + startPathAt),
        l * playebackRate +
          startPathAt +
          "," +
          (l * playebackRate + startPathAt)
      )

      let marker = d3.select("#marker")
      let p = linePath
        .node()
        .getPointAtLength((progress + t * playebackRate) * l)

      //Move the marker to that point
      marker.attr("transform", "translate(" + p.x + "," + p.y + ")") //move marker
      return interpolate(t)
    }
  } //end tweenDash
}
