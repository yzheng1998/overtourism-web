import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagonMapping } from "../../../../../geojson/hexagon_mapping.js";
import { tourismIndexColorScale } from "../../ColorScales/map4ColorScales";

export default function map6Layers(mapState, onHover, onClick) {
  var layers = [];

  const opacity = 0.8;

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
        getFillColor: [mapState],
      },
    })
  );

  return layers;
}
