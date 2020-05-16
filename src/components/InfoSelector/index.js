import React from "react";
import Typography from "@material-ui/core/Typography";
import { infoArray } from "../BaseMap/utils/Layers/infoLayers";

export default function InfoSelector(props) {
  const { infoToggleState, onClick } = props;

  const display = (id) => {
    return !infoToggleState.includes(id);
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
      {infoArray.map(({ id, name, color }) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            key={id}
            className="input"
          >
            <button
              className="info-selector-button"
              style={{
                backgroundColor: display(id)
                  ? "rgba(46, 46, 46, 0.8)"
                  : "rgba(46, 46, 46, 0.2)",
                width: 140,
                border: 0.5,
                flexDirection: "row",
                display: "inline-flex",
                alignItems: "center",
                marginTop: 1,
                marginBottom: 1,
                borderRadius: 2,
              }}
              onClick={() => onClick(id)}
            >
              <div
                className="info-selector-color"
                style={{
                  backgroundColor: color,
                  height: "10px",
                  width: "10px",
                  borderRadius: "6px",
                  marginRight: "12px",
                }}
              ></div>
              <Typography
                variant={"subtitle2"}
                style={{
                  fontFamily: "Helvetica",
                  marginRight: "12px",
                  fontWeight: "bold",
                  color: "white",
                  opacity: display(id) ? 1 : 0.5,
                }}
              >
                {name}
              </Typography>
            </button>
          </div>
        );
      })}
    </div>
  );
}
