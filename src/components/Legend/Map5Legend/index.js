import React from "react";
import Typography from "@material-ui/core/Typography";
import { openLegend } from "../../BaseMap/utils/ColorScales/map5ColorScales";

export default function Map5Legend(props) {
  const { layerIndex, onClick, mapState, children, urbanFormState } = props;

  var legend;
  switch (layerIndex) {
    case 1:
      legend = openLegend;
      break;
    default:
      legend = openLegend;
      break;
  }

  var updatedLegend;
  updatedLegend = legend
    .map(([x, y], i) => {
      if (i === legend.length - 1) {
        return [`${100 * x}% - 100%`, y];
      } else {
        return [`${100 * x}% - ${100 * legend[i + 1][0]}%`, y];
      }
    })
    .reverse();
  updatedLegend = [...updatedLegend, [`0%`, "#FFFFFF"]];

  const disabled = (value) => {
    return mapState.includes(value);
  };

  return (
    <>
      {!urbanFormState.includes(3) && (
        <div
          style={{
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
                    width: 130,
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
          ...{children}
        </div>
      )}
    </>
  );
}
