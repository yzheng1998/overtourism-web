import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagon } from "../../../../../geojson/hexagon.js";
import { landmarks } from "../../../../../geojson/landmarks.js";

import {
  popColorScale,
  popChangeColorScale,
  uohColorScale,
  uohChangeColorScale,
} from "../../ColorScales/map1ColorScales";

export const UrbanFormInfoArray = [
  { id: "landmarks", name: "Landmarks", color: "rgb(0, 0, 0)", index: 1 },
];

export default function map1Layers(
  layerIndex,
  mapState,
  urbanFormState,
  onHover,
  onClick
) {
  var year;
  switch (layerIndex) {
    case 1:
      year = "pop_91";
      break;
    case 2:
      year = "pop_01";
      break;
    case 3:
      year = "pop_11";
      break;
    case 5:
      year = "uoh_91";
      break;
    case 6:
      year = "uoh_01";
      break;
    case 7:
      year = "uoh_11";
      break;
    default:
      year = null;
  }

  var layers = [];

  const opacity = 0.8;

  if (layerIndex >= 1 && layerIndex < 4) {
    layers.push(
      new GeoJsonLayer({
        id: "pop",
        data: hexagon,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: (f) => {
          return popColorScale(Math.round(f.properties[year]), mapState);
        },
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState],
        },
      })
    );
  }

  if (layerIndex === 4) {
    layers.push(
      new GeoJsonLayer({
        id: "popChange",
        data: hexagon,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: (f) => {
          return popChangeColorScale(
            f.properties.pop_mult,
            mapState,
            f.properties.pop_91,
            f.properties.pop_11
          );
        },
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState],
        },
      })
    );
  }

  if (layerIndex >= 5 && layerIndex < 8) {
    layers.push(
      new GeoJsonLayer({
        id: "uoh",
        data: hexagon,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: (f) => {
          return uohColorScale(Math.round(f.properties[year]), mapState);
        },
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState],
        },
      })
    );
  }

  if (layerIndex === 8) {
    layers.push(
      new GeoJsonLayer({
        id: "uohChange",
        data: hexagon,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: (f) => {
          return uohChangeColorScale(
            f.properties.uoh_mult,
            mapState,
            f.properties.uoh_91,
            f.properties.uoh_11
          );
        },
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState],
        },
      })
    );
  }

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
