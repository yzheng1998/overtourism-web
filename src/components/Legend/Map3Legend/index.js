import React from "react";
import Typography from "@material-ui/core/Typography";
import { map3InfoArray } from "../../BaseMap/utils/Layers/map3Layers";

export default function Map3Legend(props) {
  const { map3State, onClick } = props;

  const display = (id) => {
    return !map3State.includes(id);
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
      {map3InfoArray.map(({ id, name, color }) => {
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
              className="map3-info-selector-button"
              style={{
                backgroundColor: display(id)
                  ? "rgba(46, 46, 46, 0.8)"
                  : "rgba(46, 46, 46, 0.2)",
                width: 180,
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
                className="map3-info-selector-color"
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
