import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagonMapping } from "../../../../../geojson/hexagon_mapping.js";
import { landmarks } from "../../../../../geojson/landmarks.js";
// import { streets } from "../../../../../geojson/streets.js";
import { openColorScale } from "../../ColorScales/map5ColorScales";

export const map5Maps = [{ id: "openSpace", name: "% Open Space", index: 1 }];

export const UrbanFormInfoArray = [
  { id: "landmarks", name: "Landmarks", color: "rgb(0, 0, 0)", index: 1 },
  { id: "streets", name: "Streets", color: "rgb(128, 0, 128)", index: 2 },
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

  const opacity = 0.8;

  layerIndex === 1 &&
    layers.push(
      new GeoJsonLayer({
        id: "open",
        data: hexagonMapping,
        opacity,
        getLineColor: (f) => {
          return openColorScale(f.properties.open_pp, mapState)[3] === 0
            ? [220, 220, 220]
            : [0, 0, 0, 0];
        },
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

//   display(2) &&
//     layers.push(
//       new GeoJsonLayer({
//         id: "streets",
//         data: streets,
//         opacity,
//         getLineColor: [255, 255, 255, 0],
//         getFillColor: [128, 0, 128],
//         pickable: true,
//         onHover: onHover,
//         onClick: onClick,
//         updateTriggers: {
//           getFillColor: [layerIndex, mapState, urbanFormState],
//         },
//       })
//     );

  return layers;
}
