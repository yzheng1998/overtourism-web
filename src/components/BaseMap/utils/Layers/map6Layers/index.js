import { GeoJsonLayer, TextLayer } from "@deck.gl/layers";
import { hexagonMapping } from "../../../../../geojson/hexagon_mapping.js";
import { landmarks } from "../../../../../geojson/landmarks.js";
import { canal } from "../../../../../geojson/canal.js";
import {
  tourismIndexColorScale,
  tourismLineColor,
} from "../../ColorScales/map4ColorScales";

const textArr = [
  {
    id: 578,
    coordinates: [12.33675, 45.43304, 0],
  },
  {
    id: 1584,
    coordinates: [12.33068, 45.44647, 0],
  },
];

export default function map6Layers(mapState, urbanFormState, onHover, onClick) {
  var layers = [];

  const opacity = 0.8;

  layers.push(
    new GeoJsonLayer({
      id: "tourismIndex",
      data: hexagonMapping,
      opacity,
      getLineColor: (f) =>
        f.properties.Id === 1584 || f.properties.Id === 578
          ? [255, 255, 0]
          : tourismLineColor(f.properties.tourism_sc, mapState),
      getFillColor: (f) =>
        f.properties.Id === 1584 || f.properties.Id === 578
          ? [255, 255, 0]
          : tourismIndexColorScale(f.properties.tourism_sc, mapState),
      getLineWidth: 2,
      pickable: true,
      onHover: onHover,
      updateTriggers: {
        getFillColor: [mapState],
        getLineColor: [mapState],
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

  layers.push(
    new TextLayer({
      id: "text",
      data: textArr,
      getPosition: (f) => f.coordinates,
      getText: (f) => {
        if (f.id === 1584) return "1";
        else if (f.id === 578) return "2";
      },
      getSize: 18,
      getAngle: 0,
      getTextAnchor: "middle",
      getAlignmentBaseline: "center",
      fontFamily: "Helvetica",
    })
  );

  return layers;
}
