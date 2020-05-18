import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagonMapping } from "../../../../../geojson/hexagon_mapping.js";
import { hexagonBeds } from "../../../../../geojson/hexagon_beds.js";
import {
  tourismIndexColorScale,
  bedsColorScale,
} from "../../ColorScales/map4ColorScales";

export const map5Maps = [
  { id: "built", name: "% Built-up Space", index: 1 },
  { id: "water", name: "% Water", index: 2 },
  { id: "openSpace", name: "% Open Space", index: 3 },
];

export const map5InfoArray = [
  { id: "landmarks", name: "Airbnbs (Jan 2020)", color: "rgb(0, 0, 255)" },
  { id: "maskShops", name: "Mask Shops", color: "rgb(255, 0, 0)" },
  { id: "clothingShops", name: "Clothing Shops", color: "rgb(182, 252, 207)" },
  { id: "jewelryShops", name: "Jewelry Shops", color: "rgb(207, 23, 185)" },
  { id: "restaurants", name: "Restaurants", color: "rgb(245, 227, 27)" },
];

export default function map5Layers(layerIndex, mapState, onHover, onClick) {
  var layers = [];

  const opacity = 1;

  layerIndex === 1 &&
    layers.push(
      new GeoJsonLayer({
        id: "tourismIndex",
        data: hexagonMapping,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: (f) => {
          return tourismIndexColorScale(f.properties.tourism__1, mapState);
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
        getLineColor: [255, 255, 255, 0],
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

  return layers;
}
