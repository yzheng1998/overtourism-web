import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagonMapping } from "../../../../../geojson/hexagon_mapping.js";
import { landmarks } from "../../../../../geojson/landmarks.js";
import { canal } from "../../../../../geojson/canal.js";

import {
  popColorScale,
  popChangeColorScale,
  uohColorScale,
  uohChangeColorScale,
  popLineColor,
  popChangeLineColor,
  uohLineColor,
  uohChangeLineColor,
} from "../../ColorScales/map1ColorScales";

export const UrbanFormInfoArray = [
  {
    id: "landmarks",
    name: "Relevant Landmarks",
    color: "rgb(0, 0, 0)",
    index: 1,
  },
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
        data: hexagonMapping,
        opacity,
        getLineColor: (f) => {
          return popLineColor(Math.round(f.properties[year]), mapState);
        },
        getFillColor: (f) => {
          return popColorScale(Math.round(f.properties[year]), mapState);
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
  }

  if (layerIndex === 4) {
    layers.push(
      new GeoJsonLayer({
        id: "popChange",
        data: hexagonMapping,
        opacity,
        getLineColor: (f) => {
          return popChangeLineColor(
            mapState,
            f.properties.pop_91,
            f.properties.pop_11
          );
        },
        getFillColor: (f) => {
          return popChangeColorScale(
            f.properties.pop_pchang,
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
          getLineColor: [layerIndex, mapState],
        },
      })
    );
  }

  if (layerIndex >= 5 && layerIndex < 8) {
    layers.push(
      new GeoJsonLayer({
        id: "uoh",
        data: hexagonMapping,
        opacity,
        getLineColor: (f) => {
          return uohLineColor(Math.round(f.properties[year]), mapState);
        },
        getFillColor: (f) => {
          return uohColorScale(Math.round(f.properties[year]), mapState);
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
  }

  if (layerIndex === 8) {
    layers.push(
      new GeoJsonLayer({
        id: "uohChange",
        data: hexagonMapping,
        opacity,
        getLineColor: (f) => {
          return uohChangeLineColor(
            mapState,
            f.properties.uoh_91,
            f.properties.uoh_11
          );
        },
        getFillColor: (f) => {
          return uohChangeColorScale(
            f.properties.uoh_pchang,
            mapState,
            f.properties.uoh_91,
            f.properties.uoh_11
          );
        },
        pickable: (f) =>
          uohChangeColorScale(
            f.properties.uoh_pchang,
            mapState,
            f.properties.uoh_91,
            f.properties.uoh_11
          )[3] !== 0,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState],
          getLineColor: [layerIndex, mapState],
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

  !urbanFormState.includes(1) &&
    layers.push(
      new GeoJsonLayer({
        id: "canal",
        data: canal,
        opacity,
        getLineColor: [0, 0, 0],
        getLineWidth: 4,
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  return layers;
}
