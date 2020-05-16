import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagon } from "../../../../geojson/hexagon.js";
import map2Layers from "./map2Layers";
import map3Layers from "./map3Layers";
import map4Layers from "./map4Layers";
import map5Layers from "./map5Layers";
import map6Layers from "./map6Layers";

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
  map2State,
  map3State,
  map4State,
  map5State,
  map6State,
  mapIndex
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

  if (mapIndex === 1) {
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
  }

  if (mapIndex === 2) {
    layers.push(map2Layers(map2State, onHover));
  }

  if (mapIndex === 3) {
    layers.push(map3Layers(map3State, onHover));
  }

  if (mapIndex === 4) {
    layers.push(map4Layers(map4State, onHover));
  }

  if (mapIndex === 5) {
    layers.push(map5Layers(map5State, onHover));
  }

  if (mapIndex === 6) {
    layers.push(map6Layers(map6State, onHover));
  }

  return layers;
}
