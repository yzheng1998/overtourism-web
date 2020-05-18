import React from "react";
import Typography from "@material-ui/core/Typography";
import { map4Maps } from "../BaseMap/utils/Layers/map4Layers";

export default function Map4Selector(props) {
  const { layerIndex, onClick } = props;

  const display = (index) => {
    return layerIndex === index;
  };
  return (
    <div
      style={{
        position: "absolute",
        left: "24px",
        bottom: "24px",
        color: "#FFFFFF",
      }}
    >
      {map4Maps.map(({ id, name, index }) => {
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
                backgroundColor: display(index)
                  ? "rgba(46, 46, 46, 0.8)"
                  : "rgba(46, 46, 46, 0.2)",
                width: 150,
                border: 0.5,
                flexDirection: "row",
                display: "inline-flex",
                alignItems: "center",
                marginTop: 1,
                marginBottom: 1,
                borderRadius: 2,
              }}
              onClick={() => onClick(index)}
            >
              <Typography
                variant={"subtitle2"}
                style={{
                  fontFamily: "Helvetica",
                  marginRight: "12px",
                  fontWeight: "bold",
                  color: "white",
                  opacity: display(index) ? 1 : 0.5,
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
