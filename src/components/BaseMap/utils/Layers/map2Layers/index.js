import { GeoJsonLayer, IconLayer } from "@deck.gl/layers";
import { PathStyleExtension } from "@deck.gl/extensions";
import Plus from "./plus.png";
import { groceries } from "../../../../../geojson/groceries.js";
import { schools } from "../../../../../geojson/schools.js";
import { stops } from "../../../../../geojson/stops.js";
import { transitLines } from "../../../../../geojson/transitLines.js";
import { landmarks } from "../../../../../geojson/landmarks.js";

export const map2InfoArray = [
  { id: "transitLines", name: "Transit Lines", color: "rgb(0, 0, 0)" },
  { id: "stops", name: "Transit Stops", color: "rgb(0, 0, 0)" },
  { id: "groceries", name: "Groceries", color: "rgb(255, 0, 0)" },
  { id: "schools", name: "Schools", color: "rgb(0, 255, 0)" },
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

  const ICON_MAPPING = {
    stop: { x: 0, y: 0, width: 981, height: 981 },
  };

  display("stops") &&
    layers.push(
      new IconLayer({
        id: "stops",
        data: stops.features,
        iconAtlas: Plus,
        iconMapping: ICON_MAPPING,
        sizeScale: 1,
        getSize: 20,
        pickable: true,
        getPosition: (d) => [...d.geometry.coordinates[0], 0],
        getIcon: (d) => "stop",
        onHover,
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
