import { GeoJsonLayer } from "@deck.gl/layers";
import { groceries } from "../../../../../geojson/groceries.js";
import { schools } from "../../../../../geojson/schools.js";
import { stops } from "../../../../../geojson/stops.js";
import { transitLines } from "../../../../../geojson/transitLines.js";

export const infoArray = [
  { id: "transitLines", name: "Transit Lines", color: "rgb(255, 0, 0)" },
  { id: "stops", name: "Stops", color: "rgb(182, 252, 207)" },
  { id: "groceries", name: "Groceries", color: "rgb(207, 23, 185)" },
  { id: "schools", name: "Schools", color: "rgb(245, 227, 27)" },
];

export default function map2Layers(map2State, onHover, onClick) {
  let layers = [];

  const display = (id) => {
    return !map2State.includes(id);
  };

  const opacity = 1;

  display("transitLines") &&
    layers.push(
      new GeoJsonLayer({
        id: "transitLines",
        data: transitLines,
        opacity,
        getLineColor: [255, 0, 0],
        stroked: false,
        getLineWidth: 6,
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
        getRadius: 20,
        stroked: false,
        getFillColor: [182, 252, 207],
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
        getRadius: 20,
        getFillColor: [207, 23, 185],
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
        getRadius: 20,
        getFillColor: [245, 227, 27],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  return layers;
}