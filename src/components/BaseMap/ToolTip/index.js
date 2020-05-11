import React from "react";

export default function ToolTip(props) {
  const { x, y, hoveredObject, layerIndex } = props;
  return hoveredObject ? (
    <div className="tooltip" style={{ top: y, left: x }}>
      {layerIndex === 0 && (
        <>
          <b>Population</b>
          <div>{parseInt(hoveredObject.properties.pop_91)} people</div>
        </>
      )}
      {layerIndex === 1 && (
        <>
          <b>Population</b>
          <div>{parseInt(hoveredObject.properties.pop_01)} people</div>
        </>
      )}
      {layerIndex === 2 && (
        <>
          <b>Population</b>
          <div>{parseInt(hoveredObject.properties.pop_11)} people</div>
        </>
      )}
      {layerIndex === 3 && (
        <>
          <b>Population Percent Change</b>
          <div>{parseInt(hoveredObject.properties.pop_pchang)} %</div>
        </>
      )}
      {layerIndex === 4 && (
        <>
          <b>Unoccupied Dwellings</b>
          <div>{parseInt(hoveredObject.properties.uoh_91)} dwellings</div>
        </>
      )}
      {layerIndex === 5 && (
        <>
          <b>Unoccupied Dwellings</b>
          <div>{parseInt(hoveredObject.properties.uoh_01)} dwellings</div>
        </>
      )}
      {layerIndex === 6 && (
        <>
          <b>Unoccupied Dwellings</b>
          <div>{parseInt(hoveredObject.properties.uoh_11)} dwellings</div>
        </>
      )}
      {layerIndex === 7 && (
        <>
          <b>Unoccupied Dwellings Percent Change</b>
          <div>{parseInt(hoveredObject.properties.uoh_pchang)} %</div>
        </>
      )}
    </div>
  ) : (
    <></>
  );
}
