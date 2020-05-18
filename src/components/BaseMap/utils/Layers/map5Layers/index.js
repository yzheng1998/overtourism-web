import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagonMapping } from "../../../../../geojson/hexagon_mapping.js";
import { landmarks } from "../../../../../geojson/landmarks.js";
import { streets } from "../../../../../geojson/streets.js";
import { streetIntersections } from "../../../../../geojson/street_intersections.js";
import {
  builtColorScale,
  waterColorScale,
  openColorScale,
} from "../../ColorScales/map5ColorScales";

export const map5Maps = [
  { id: "built", name: "% Built-up Space", index: 1 },
  { id: "water", name: "% Water", index: 2 },
  { id: "openSpace", name: "% Open Space", index: 3 },
];

export const UrbanFormInfoArray = [
  { id: "landmarks", name: "Landmarks", color: "rgb(0, 0, 0)", index: 1 },
  { id: "streets", name: "Streets", color: "rgb(128, 0, 128)", index: 2 },
  {
    id: "intersections",
    name: "Intersection % Change",
    color: "rgb(245, 227, 27)",
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

  const opacity = 1;

  layerIndex === 1 &&
    layers.push(
      new GeoJsonLayer({
        id: "built",
        data: hexagonMapping,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: (f) => {
          return builtColorScale(f.properties.built_pp, mapState);
        },
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
        id: "built",
        data: hexagonMapping,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: (f) => {
          return waterColorScale(f.properties.water_pp, mapState);
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
        id: "built",
        data: hexagonMapping,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: (f) => {
          return openColorScale(f.properties.open_pp, mapState);
        },
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState],
        },
      })
    );

  display(1) &&
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
        updateTriggers: {
          getFillColor: [layerIndex, mapState, urbanFormState],
        },
      })
    );

  display(2) &&
    layers.push(
      new GeoJsonLayer({
        id: "streets",
        data: streets,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: [128, 0, 128],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
        updateTriggers: {
          getFillColor: [layerIndex, mapState, urbanFormState],
        },
      })
    );

  display(3) &&
    layers.push(
      new GeoJsonLayer({
        id: "streetIntersections",
        data: streetIntersections,
        opacity,
        getRadius: 3,
        stroked: false,
        getFillColor: [245, 227, 27],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  return layers;
}
