import React from "react";
import Map1ToolTip from "./Map1ToolTip";
import Map2ToolTip from "./Map2ToolTip";
import Map3ToolTip from "./Map3ToolTip";
import Map4ToolTip from "./Map4ToolTip";
import Map5ToolTip from "./Map5ToolTip";

export default function ToolTip(props) {
  const { x, y, hoveredObject, hoveredLayer, layerIndex, mapIndex } = props;

  return (
    <>
      {mapIndex === 1 && (
        <Map1ToolTip
          x={x}
          y={y}
          hoveredLayer={hoveredLayer}
          hoveredObject={hoveredObject}
          layerIndex={layerIndex}
        />
      )}
      {mapIndex === 2 && (
        <Map2ToolTip
          x={x}
          y={y}
          hoveredLayer={hoveredLayer}
          hoveredObject={hoveredObject}
        />
      )}
      {mapIndex === 3 && (
        <Map3ToolTip
          x={x}
          y={y}
          hoveredLayer={hoveredLayer}
          hoveredObject={hoveredObject}
        />
      )}
      {mapIndex === 4 && (
        <Map4ToolTip
          x={x}
          y={y}
          hoveredLayer={hoveredLayer}
          hoveredObject={hoveredObject}
        />
      )}
      {mapIndex === 5 && (
        <Map5ToolTip
          x={x}
          y={y}
          hoveredLayer={hoveredLayer}
          hoveredObject={hoveredObject}
        />
      )}
    </>
  );
}
