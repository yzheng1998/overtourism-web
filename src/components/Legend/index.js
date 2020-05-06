import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default function Legend(props) {
  const { colors, type } = props;
  var updatedColors = colors
    .map(([x, y], i) => {
      if (i === colors.length - 1) {
        return [`> ${x}`, y];
      } else {
        return [`${x} - ${colors[i + 1][0]}`, y];
      }
    })
    .reverse();
  updatedColors =
    type === 3 || type === 7
      ? [...updatedColors, [NaN, "#808080"]]
      : [...updatedColors, [0, "#FFFFFF"]];

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
      {updatedColors.map((value) => {
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
            <Typography variant={"subtitle1"} style={{ marginRight: "12px" }}>
              {value[0]}
            </Typography>
            <input
              className="legend-input"
              type="color"
              value={value[1]}
              disabled={true}
            />
          </div>
        );
      })}
    </Paper>
  );
}
