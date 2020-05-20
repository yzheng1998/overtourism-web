import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagonMapping } from "../../../../../geojson/hexagon_mapping.js";
import { hexagonBeds } from "../../../../../geojson/hexagon_beds.js";
import { landmarks } from "../../../../../geojson/landmarks.js";
import {
  tourismIndexColorScale,
  internationalityColorScale,
  bedsColorScale,
} from "../../ColorScales/map4ColorScales";

export const map4Maps = [
  { id: "tourismIndex", name: "Tourism Index", index: 1 },
  { id: "internationality", name: "Internationality", index: 2 },
  { id: "beds", name: "Number of Beds", index: 3 },
];

export default function map4Layers(layerIndex, mapState, onHover, onClick) {
  var layers = [];

  const opacity = 0.8;

  layerIndex === 1 &&
    layers.push(
      new GeoJsonLayer({
        id: "tourismIndex",
        data: hexagonMapping,
        opacity,
        getLineColor: (f) => {
          return tourismIndexColorScale(
            f.properties.tourism__1,
            mapState
          )[3] === 0
            ? [220, 220, 220]
            : [0, 0, 0, 0];
        },
        getFillColor: (f) => {
          return tourismIndexColorScale(f.properties.tourism__1, mapState);
        },
        getLineWidth: 2,
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState],
        },
      })
    );

  layerIndex === 2 &&
    layers.push(
      new GeoJsonLayer({
        id: "internationality",
        data: hexagonMapping,
        opacity,
        getLineColor: (f) => {
          return internationalityColorScale(
            f.properties.componen_6,
            mapState
          )[3] === 0
            ? [220, 220, 220]
            : [0, 0, 0, 0];
        },
        getFillColor: (f) => {
          return internationalityColorScale(f.properties.componen_6, mapState);
        },
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState],
        },
      })
    );

  layerIndex === 3 &&
    layers.push(
      new GeoJsonLayer({
        id: "beds",
        data: hexagonBeds,
        opacity,
        getLineColor: (f) => {
          return bedsColorScale(Math.round(f.properties.beds), mapState)[3] ===
            0
            ? [220, 220, 220]
            : [0, 0, 0, 0];
        },
        getFillColor: (f) => {
          return bedsColorScale(Math.round(f.properties.beds), mapState);
        },
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState],
        },
      })
    );
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
