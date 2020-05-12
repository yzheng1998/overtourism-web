import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagon } from "../../../../geojson/hexagon.js";
import infoLayers from "./infoLayers";

import {
  COLOR_SCALE,
  COLOR_SCALE_change,
  COLOR_SCALE_UOH,
  COLOR_SCALE_change_UOH,
} from "../ColorScales";

export default function renderLayer(
  layerIndex,
  onHover,
  onClick,
  toggleState,
  infoToggleState
) {
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

  let layers = [];

  const opacity = 1;

  if (layerIndex >= 0 && layerIndex < 3) {
    layers.push(
      new GeoJsonLayer({
        id: "pop",
        data: hexagon,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: (f) => {
          return COLOR_SCALE(Math.round(f.properties[year]), toggleState);
        },
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, toggleState],
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
          return COLOR_SCALE_change(
            f.properties.pop_mult,
            toggleState,
            f.properties.pop_91,
            f.properties.pop_11
          );
        },
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, toggleState],
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
          return COLOR_SCALE_UOH(Math.round(f.properties[year]), toggleState);
        },
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, toggleState],
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
          return COLOR_SCALE_change_UOH(
            f.properties.uoh_mult,
            toggleState,
            f.properties.uoh_91,
            f.properties.uoh_11
          );
        },
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, toggleState],
        },
      })
    );
  }

  return layers.concat(infoLayers(infoToggleState));
}
