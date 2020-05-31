import React from "react";
import Typography from "@material-ui/core/Typography";
import { tourismIndexLegend } from "../../BaseMap/utils/ColorScales/map4ColorScales";

export default function Map6Legend(props) {
  const { onClick, mapState } = props;

  var updatedLegend = [
    ["Selected Areas", "rgb(255, 255, 0)"],
    ...tourismIndexLegend.slice(4, 11).reverse(),
  ];

  const disabled = (value) => {
    return mapState.includes(value);
  };

  return (
    <div
      style={{
        position: "absolute",
        right: "24px",
        bottom: "24px",
        color: "#FFFFFF",
      }}
    >
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
                backgroundColor: disabled(value[1])
                  ? "rgba(46,46,46,.2)"
                  : "rgba(46, 46, 46, 0.8)",
                width: 160,
                border: 0.5,
                flexDirection: "row",
                display: "inline-flex",
                alignItems: "center",
                marginTop: 1,
                marginBottom: 1,
                borderRadius: 2,
              }}
              onClick={() => onClick(value[1])}
            >
              <div
                style={{
                  float: "left",
                  borderRight: `3px solid ${value[1]}`,
                  borderTop: "5.2px solid transparent",
                  borderBottom: "5.2px solid transparent",
                }}
              ></div>
              <div
                className="legend-color"
                style={{
                  float: "left",
                  width: "6px",
                  height: "10.4px",
                  backgroundColor: value[1],
                }}
              ></div>
              <div
                style={{
                  float: "left",
                  borderLeft: `3px solid ${value[1]}`,
                  borderTop: "5.2px solid transparent",
                  borderBottom: "5.2px solid transparent",
                  marginRight: "12px",
                }}
              ></div>

              <Typography
                variant={"subtitle2"}
                style={{
                  fontFamily: "Helvetica",
                  marginRight: "12px",
                  color: "white",
                  opacity: disabled(value[1]) ? 0.5 : 1,
                }}
              >
                {value[0]}
              </Typography>
            </button>
          </div>
        );
      })}
    </div>
  );
}
