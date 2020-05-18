import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagon } from "../../../../../geojson/hexagon.js";

import {
  popColorScale,
  popChangeColorScale,
  uohColorScale,
  uohChangeColorScale,
} from "../../ColorScales/map1ColorScales";

export default function map1Layers(layerIndex, mapState, onHover, onClick) {
  var year;
  switch (layerIndex) {
    case 0:
      year = "pop_91";
      break;
    case 1:
      year = "pop_01";
      break;
    case 2:
      year = "pop_11";
      break;
    case 4:
      year = "uoh_91";
      break;
    case 5:
      year = "uoh_01";
      break;
    case 6:
      year = "uoh_11";
      break;
    default:
      year = null;
  }

  var layers = [];

  const opacity = 1;

  if (layerIndex >= 0 && layerIndex < 3) {
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

  if (layerIndex === 3) {
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

  if (layerIndex >= 4 && layerIndex < 7) {
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

  if (layerIndex === 7) {
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

  return layers;
}
