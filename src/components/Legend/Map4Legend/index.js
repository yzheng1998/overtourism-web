import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  tourismIndexLegend,
  internationalityLegend,
  bedsLegend,
} from "../../BaseMap/utils/ColorScales/map4ColorScales";

export default function Map4Legend(props) {
  const { layerIndex, onClick, mapState } = props;

  var legend;
  switch (layerIndex) {
    case 1:
      legend = tourismIndexLegend;
      break;
    case 2:
      legend = internationalityLegend;
      break;
    case 3:
      legend = bedsLegend;
      break;
    default:
      legend = tourismIndexLegend;
      break;
  }
  var updatedLegend;

  if (legend === tourismIndexLegend) {
    updatedLegend = legend.slice(4, 11).reverse();
  } else {
    updatedLegend = legend
      .map(([x, y], i) => {
        if (i === legend.length - 1) {
          return [`>= ${x}`, y];
        } else if (i === 0) {
          return [
            `${x + +(layerIndex === 3)} - ${
              legend[i + 1][0] - +(layerIndex === 3)
            }`,
            y,
          ];
        } else {
          return [`${x} - ${legend[i + 1][0] - +(layerIndex === 3)}`, y];
        }
      })
      .reverse();
    updatedLegend = [...updatedLegend, [0, "#FFFFFF"]];
  }
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
                width: 120,
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
