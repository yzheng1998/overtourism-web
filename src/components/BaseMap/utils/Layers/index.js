import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagon } from "../../../../geojson/hexagon.js";

import {
  COLOR_SCALE,
  COLOR_SCALE_change,
  COLOR_SCALE_UOH,
  COLOR_SCALE_change_UOH,
} from "../ColorScales";

export default function renderLayer(layerIndex, _onHover, _onClick) {
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
        id: "geojson",
        data: hexagon,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: (f) => {
          if (f.properties[year] === 0) return [255, 255, 255];
          else return COLOR_SCALE(f.properties[year]);
        },
        pickable: true,
        onHover: _onHover,
        onClick: _onClick,
        updateTriggers: {
          getFillColor: [layerIndex],
        },
      })
    );
  }

  if (layerIndex === 3) {
    layers.push(
      new GeoJsonLayer({
        id: "geojson",
        data: hexagon,
        opacity,
        getLineColor: [255, 255, 255],
        getFillColor: (f) => {
          if (f.properties.pop_91 === 0 && f.properties.pop_11 === 0) {
            return [255, 255, 255];
          } else if (f.properties.pop_91 === 0) {
            return [128, 128, 128];
          } else return COLOR_SCALE_change(f.properties.pop_pchang);
        },
        pickable: true,
        onHover: _onHover,
        onClick: _onClick,
        updateTriggers: {
          getFillColor: ["pop_pchang"],
        },
      })
    );
  }

  if (layerIndex >= 4 && layerIndex < 7) {
    layers.push(
      new GeoJsonLayer({
        id: "geojson",
        data: hexagon,
        opacity,
        getLineColor: [255, 255, 255],
        getFillColor: (f) => {
          if (f.properties[year] === 0) return [255, 255, 255];
          else return COLOR_SCALE_UOH(f.properties[year]);
        },
        pickable: true,
        onHover: _onHover,
        onClick: _onClick,
        updateTriggers: {
          getFillColor: [layerIndex],
        },
      })
    );
  }

  if (layerIndex === 7) {
    layers.push(
      new GeoJsonLayer({
        id: "geojson",
        data: hexagon,
        opacity,
        getLineColor: [255, 255, 255],
        getFillColor: (f) => {
          if (f.properties.uoh_91 === 0 && f.properties.uoh_11 === 0) {
            return [255, 255, 255];
          } else if (f.properties.uoh_91 === 0) {
            return [128, 128, 128];
          } else return COLOR_SCALE_change_UOH(f.properties.uoh_pchang);
        },
        pickable: true,
        onHover: _onHover,
        onClick: _onClick,
        updateTriggers: {
          getFillColor: ["uoh_change"],
        },
      })
    );
  }
  return layers;
}
