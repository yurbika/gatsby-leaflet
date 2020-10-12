import * as d3 from "d3"
import L from "leaflet"

const animatePolyline = (map, points) => {
  var svg = d3.select(map.getPanes()["animatedRoute"]).append("svg")

  // if you don't include the leaflet-zoom-hide when a
  // user zooms in or out you will still see the phantom
  // original SVG
  var g = svg.append("g").attr("class", "leaflet-zoom-hide")

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

  var marker = g
    .append("circle")
    .attr("r", 8)
    .attr("id", "marker")
    .attr("class", "travelMarker")
    .attr(
      "transform",
      "translate(" +
        map.latLngToLayerPoint(points[0]).x +
        "," +
        map.latLngToLayerPoint(points[0]).y +
        ")"
    )

  var linePath = g
    .selectAll(".lineConnect")
    .data([points])
    .enter()
    .append("path")
    .attr("class", "lineConnect")

  var originANDdestination = [points[0], points[points.length - 1]]
  function applyLatLngToLayer(d) {
    return map.latLngToLayerPoint(d)
  }

  var begend = g
    .selectAll(".drinks")
    .data(originANDdestination)
    .enter()
    .append("circle", ".drinks")
    .attr("r", 5)
    .style("fill", "red")
    .style("opacity", "1")
    .attr("transform", function (d) {
      return (
        "translate(" +
        applyLatLngToLayer(d).x +
        "," +
        applyLatLngToLayer(d).y +
        ")"
      )
    })

  let sw = L.polyline(points).getBounds()["_southWest"]
  let ne = L.polyline(points).getBounds()["_northEast"]
  let bottomRight = map.latLngToLayerPoint(sw)
  let topLeft = map.latLngToLayerPoint(ne)

  svg
    .attr("width", Math.abs(bottomRight.x - topLeft.x) + 20)
    .attr("height", Math.abs(bottomRight.y - topLeft.y) + 20)
    .style("left", bottomRight.x - 10 + "px")
    .style("top", topLeft.y - 10 + "px")
    .style("border", "1px solid black")

  g.attr(
    "transform",
    "translate(" + (-bottomRight.x + 10) + "," + (-topLeft.y + 10) + ")"
  )
}

export default animatePolyline
