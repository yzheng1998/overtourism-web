import { GeoJsonLayer } from "@deck.gl/layers";
import { PathStyleExtension } from "@deck.gl/extensions";
import { groceries } from "../../../../../geojson/groceries.js";
import { schools } from "../../../../../geojson/schools.js";
import { stops } from "../../../../../geojson/stops.js";
import { transitLines } from "../../../../../geojson/transitLines.js";
import { landmarks } from "../../../../../geojson/landmarks.js";

export const map2InfoArray = [
  { id: "transitLines", name: "Transit Lines", color: "rgb(255, 0, 0)" },
  { id: "stops", name: "Transit Stops", color: "rgb(182, 252, 207)" },
  { id: "groceries", name: "Groceries", color: "rgb(207, 23, 185)" },
  { id: "schools", name: "Schools", color: "rgb(245, 227, 27)" },
];

export default function map2Layers(mapState, urbanFormState, onHover, onClick) {
  var layers = [];

  const display = (id) => {
    return !mapState.includes(id);
  };

  const opacity = 0.8;

  display("transitLines") &&
    layers.push(
      new GeoJsonLayer({
        id: "transitLines",
        data: transitLines,
        opacity,
        getLineColor: [0, 0, 0],
        extensions: [new PathStyleExtension({ dash: true })],
        getDashArray: [4, 3],
        dashJustified: true,
        stroked: true,
        extruded: false,
        getLineWidth: 4,
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  display("stops") &&
    layers.push(
      new GeoJsonLayer({
        id: "stops",
        data: stops,
        opacity,
        getRadius: 12,
        pointRadiusMaxPixels: 5,
        stroked: false,
        getFillColor: [0, 0, 255],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  display("groceries") &&
    layers.push(
      new GeoJsonLayer({
        id: "groceries",
        data: groceries,
        opacity,
        stroked: false,
        getRadius: 12,
        pointRadiusMaxPixels: 5,
        getFillColor: [255, 0, 0],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  display("schools") &&
    layers.push(
      new GeoJsonLayer({
        id: "schools",
        data: schools,
        opacity,
        stroked: false,
        getRadius: 12,
        pointRadiusMaxPixels: 5,
        getFillColor: [0, 255, 0],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  !urbanFormState.includes(1) &&
    layers.push(
      new GeoJsonLayer({
        id: "landmarks",
        data: landmarks,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: [0, 0, 0],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  return layers;
}
