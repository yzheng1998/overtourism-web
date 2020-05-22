import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagonMapping } from "../../../../../geojson/hexagon_mapping.js";
import { landmarksPoints } from "../../../../../geojson/landmarks_points.js";
import { streets } from "../../../../../geojson/streets.js";
import {
  openColorScale,
  openLineColor,
} from "../../ColorScales/map5ColorScales";

export const map5Maps = [{ id: "openSpace", name: "% Open Space", index: 1 }];

export const UrbanFormInfoArray = [
  { id: "landmarks", name: "Landmarks", color: "rgb(0, 0, 255)", index: 1 },
  { id: "streets", name: "Streets", color: "rgb(255, 0, 255)", index: 2 },
];

export default function map5Layers(
  layerIndex,
  mapState,
  urbanFormState,
  onHover,
  onClick
) {
  var layers = [];

  const display = (id) => {
    return !urbanFormState.includes(id);
  };

  const opacity = 0.6;
  layerIndex === 1 &&
    layers.push(
      new GeoJsonLayer({
        id: "open",
        data: hexagonMapping,
        opacity,
        getLineColor: (f) => {
          return openLineColor(f.properties.open_pp, mapState);
        },
        getFillColor: (f) => {
          return openColorScale(f.properties.open_pp, mapState);
        },
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState],
          getLineColor: [layerIndex, mapState],
        },
      })
    );

  display(2) &&
    layers.push(
      new GeoJsonLayer({
        id: "streets",
        data: streets,
        opacity,
        getLineColor: [255, 0, 255],
        getLineWidth: (f) => f.properties.Length,
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState, urbanFormState],
        },
      })
    );

  display(1) &&
    layers.push(
      new GeoJsonLayer({
        id: "landmarks",
        data: landmarksPoints,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: [0, 0, 255],
        getRadius: (f) => 5 * f.properties.rating,
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState, urbanFormState],
        },
      })
    );

  return layers;
}
