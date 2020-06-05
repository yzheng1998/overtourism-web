import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagonMapping } from "../../../../../geojson/hexagon_mapping.js";
import { landmarksPoints } from "../../../../../geojson/landmarks_points.js";
import { streets } from "../../../../../geojson/streets.js";
import {
  openColorScale,
  openLineColor,
  landmarksScale,
} from "../../ColorScales/map5ColorScales";

export const UrbanFormInfoArray = [
  { id: "landmarks", name: "Landmarks", color: "rgb(255, 90, 95)", index: 1 },
  { id: "streets", name: "Streets", color: "rgb(60, 60, 60)", index: 2 },
  {
    id: "openSpace",
    name: "% Open Space",
    color: "rgb(49, 163, 84)",
    index: 3,
  },
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
  display(3) &&
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
        opacity: 1,
        getLineColor: [60, 60, 60],
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
        opacity: 0.5,
        getLineColor: [255, 255, 255, 0],
        getFillColor: [255, 90, 95],
        getRadius: (f) => landmarksScale(f.properties.user_ratings_total),
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
