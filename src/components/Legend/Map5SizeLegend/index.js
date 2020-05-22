import React from "react";
import Typography from "@material-ui/core/Typography";
import { landmarksLegend } from "../../BaseMap/utils/ColorScales/map5ColorScales";
import { UrbanFormInfoArray } from "../../BaseMap/utils/Layers/map5Layers";

export default function Map5SizeLegend(props) {
  const { urbanFormState } = props;
  var updatedLandmarksLegend = landmarksLegend
    .map(([x, y], i) => {
      if (i === landmarksLegend.length - 1) {
        return [`>${x}`, y];
      } else if (i === 0) {
        return [`${x} - ${landmarksLegend[i + 1][0]}`, y];
      } else {
        return [`${x} - ${landmarksLegend[i + 1][0]}`, y];
      }
    })
    .reverse();

  return (
    <div
      style={{
        position: "absolute",
        left: "24px",
        bottom: "12px",
        color: "#FFFFFF",
      }}
    >
      <div style={{ marginBottom: 12 }}>
        {!urbanFormState.includes(1) && (
          <>
            <div
              style={{
                backgroundColor: "rgba(46, 46, 46, 0.8)",
                width: 150,
                border: 0.5,
                flexDirection: "row",
                justifyContent: "space-around",
                display: "inline-flex",
                alignItems: "center",
                marginTop: 1,
                marginBottom: 1,
                borderRadius: 2,
              }}
            >
              <Typography># of Ratings</Typography>
            </div>
            {updatedLandmarksLegend.map((value) => {
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
                      backgroundColor: "rgba(46, 46, 46, 0.8)",
                      width: 150,
                      border: 0.5,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      display: "inline-flex",
                      alignItems: "center",
                      marginTop: 1,
                      marginBottom: 1,
                      borderRadius: 2,
                    }}
                  >
                    <div
                      className="legend-color"
                      style={{
                        width: value[1] / 4,
                        height: value[1] / 4,
                        backgroundColor: UrbanFormInfoArray[0].color,
                        borderRadius: value[1] / 4,
                      }}
                    ></div>
                    <Typography
                      variant={"subtitle2"}
                      style={{
                        fontFamily: "Helvetica",
                        marginRight: "12px",
                        color: "white",
                      }}
                    >
                      {value[0]}
                    </Typography>
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
