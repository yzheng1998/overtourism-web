import React from "react";
import Typography from "@material-ui/core/Typography";
import { UrbanFormInfoArray } from "../BaseMap/utils/Layers/map5Layers";

export default function UrbanFormSelector(props) {
  const { mapState, onClick, children } = props;

  const display = (index) => {
    return !mapState.includes(index);
  };

  return (
    <div
      style={{
        color: "#FFFFFF",
        position: "absolute",
        right: 20,
        bottom: 20,
      }}
    >
      {UrbanFormInfoArray.map(({ id, name, color, index }) => {
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
                width: 170,
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
              {id === "openSpace" ? (
                <>
                  <div
                    style={{
                      float: "left",
                      borderRight: `3px solid ${color}`,
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
                      backgroundColor: color,
                    }}
                  ></div>
                  <div
                    style={{
                      float: "left",
                      borderLeft: `3px solid ${color}`,
                      borderTop: "5.2px solid transparent",
                      borderBottom: "5.2px solid transparent",
                      marginRight: "9px",
                    }}
                  ></div>
                </>
              ) : (
                <div
                  className="legend-color"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginRight: 10,
                    backgroundColor: color,
                  }}
                ></div>
              )}
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
      ...{children}
    </div>
  );
}
