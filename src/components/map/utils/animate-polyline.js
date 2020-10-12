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
    .style("visibility", "hidden")

  var marker = g
    .append("circle")
    .attr("r", 8)
    .attr("id", "marker")
    .attr("class", "travelMarker")

  var linePath = g
    .selectAll(".lineConnect")
    .data([points])
    .enter()
    .append("path")
    .attr("class", "lineConnect")
    .style("fill", "none")
    .style("stroke", "black")

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

    marker.attr(
      "transform",
      "translate(" +
        map.latLngToLayerPoint(points[0]).x +
        "," +
        map.latLngToLayerPoint(points[0]).y +
        ")"
    )

    svg
      .attr("width", Math.abs(bottomRight.x - topLeft.x) + 20)
      .attr("height", Math.abs(bottomRight.y - topLeft.y) + 20)
      .style("left", bottomRight.x - 10 + "px")
      .style("top", topLeft.y - 10 + "px")
      .style("border", "1px solid black")

    linePath.attr("d", toLine)

    g.attr(
      "transform",
      "translate(" + (-bottomRight.x + 10) + "," + (-topLeft.y + 10) + ")"
    )

    //end reset
  }

  function transition() {
    linePath
      .transition()
      .duration(7500)
      .attrTween("stroke-dasharray", tweenDash)
      .on("end", function () {
        d3.select(this).call(transition) // infinite loop
      })
  }

  function tweenDash() {
    return function (t) {
      var l = linePath.node().getTotalLength()

      let interpolate = d3.interpolateString("0," + l, l + "," + l)
      //t is fraction of time 0-1 since transition began
      var marker = d3.select("#marker")

      var p = linePath.node().getPointAtLength(t * l)

      //Move the marker to that point
      marker.attr("transform", "translate(" + p.x + "," + p.y + ")") //move marker
      return interpolate(t)
    }
  } //end tweenDash
}

export default animatePolyline
