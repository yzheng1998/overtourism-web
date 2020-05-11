import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  popLegend,
  popChangeLegend,
  uohLegend,
  uohChangeLegend,
} from "../BaseMap/utils/ColorScales";

export default function Legend(props) {
  const { layerIndex, onClick } = props;

  var legend;
  if (layerIndex >= 0 && layerIndex < 3) {
    legend = popLegend;
  } else if (layerIndex === 3) {
    legend = popChangeLegend;
  } else if (layerIndex > 3 && layerIndex < 7) {
    legend = uohLegend;
  } else if (layerIndex === 7) {
    legend = uohChangeLegend;
  }

  var updatedLegend = legend
    .map(([x, y], i) => {
      if (i === legend.length - 1) {
        return [`> ${x}`, y];
      } else {
        return [`${x} - ${legend[i + 1][0]}`, y];
      }
    })
    .reverse();
  updatedLegend =
    layerIndex === 3 || layerIndex === 7
      ? [...updatedLegend, ["NaN", "#808080"]]
      : [...updatedLegend, [0, "#B0B0B0"]];

  const { disabled } = updatedLegend;
  return (
    <Paper
      style={{
        position: "absolute",
        right: "24px",
        bottom: "24px",
        padding: "12px",
      }}
    >
      <Typography variant={"h6"}>Legend</Typography>
      {updatedLegend.map((value) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            key={value[0]}
            className="input"
          >
            <button
              className="legend-button"
              style={{
                backgroundColor: disabled ? "grey" : "white",
                border: 0.5,
                borderColor: "black",
                flexDirection: "row",
                display: "inline-flex",
                alignItems: "center",
              }}
              disabled={disabled}
              onClick={onClick}
            >
              <div
                className="legend-color"
                style={{
                  backgroundColor: value[1],
                  height: "10px",
                  width: "10px",
                  borderRadius: "6px",
                  marginRight: "12px",
                }}
              ></div>
              <Typography
                variant={"subtitle1"}
                style={{
                  marginRight: "12px",
                  color: disabled ? "grey" : "black",
                }}
              >
                {value[0]}
              </Typography>
            </button>
          </div>
        );
      })}
    </Paper>
  );
}
