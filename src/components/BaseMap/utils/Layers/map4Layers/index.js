import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagonMapping } from "../../../../../geojson/hexagon_mapping.js";
import { hexagonBeds } from "../../../../../geojson/hexagon_beds.js";
import { landmarks } from "../../../../../geojson/landmarks.js";
import { canal } from "../../../../../geojson/canal.js";

import {
  tourismIndexColorScale,
  internationalityColorScale,
  bedsColorScale,
  tourismLineColor,
  intlLineColor,
  bedsLineColor,
} from "../../ColorScales/map4ColorScales";

export const map4Maps = [
  { id: "tourismIndex", name: "Tourism Index", index: 1 },
  { id: "internationality", name: "Internationality", index: 2 },
  { id: "beds", name: "Number of Beds", index: 3 },
];

export default function map4Layers(
  layerIndex,
  mapState,
  urbanFormState,
  onHover,
  onClick
) {
  var layers = [];

  const opacity = 0.8;

  layerIndex === 1 &&
    layers.push(
      new GeoJsonLayer({
        id: "tourismIndex",
        data: hexagonMapping,
        opacity,
        getLineColor: (f) =>
          tourismLineColor(f.properties.tourism_sc, mapState),
        getFillColor: (f) => {
          return tourismIndexColorScale(f.properties.tourism_sc, mapState);
        },
        getLineWidth: 2,
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState],
          getLineColor: [layerIndex, mapState],
        },
      })
    );

  layerIndex === 2 &&
    layers.push(
      new GeoJsonLayer({
        id: "internationality",
        data: hexagonMapping,
        opacity,
        getLineColor: (f) => intlLineColor(f.properties.intl, mapState),
        getFillColor: (f) => {
          return internationalityColorScale(f.properties.intl, mapState);
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

  layerIndex === 3 &&
    layers.push(
      new GeoJsonLayer({
        id: "beds",
        data: hexagonBeds,
        opacity,
        getLineColor: (f) =>
          bedsLineColor(Math.round(f.properties.beds), mapState),
        getFillColor: (f) => {
          return bedsColorScale(Math.round(f.properties.beds), mapState);
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
