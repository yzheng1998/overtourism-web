import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  airbnbSizeLegend,
  restaurantSizeLegend,
} from "../../BaseMap/utils/ColorScales/map3ColorScales";
import { map3InfoArray } from "../../BaseMap/utils/Layers/map3Layers";

export default function Map3SizeLegend(props) {
  const { mapState } = props;
  var updatedAirbnbLegend = airbnbSizeLegend
    .map(([x, y], i) => {
      if (i === airbnbSizeLegend.length - 1) {
        return [`>= ${x} beds`, y];
      } else if (i === 0) {
        return [`${x} - ${airbnbSizeLegend[i + 1][0]} beds`, y];
      } else {
        return [`${x} - ${airbnbSizeLegend[i + 1][0]} beds`, y];
      }
    })
    .reverse();
  var updatedRestaurantLegend = restaurantSizeLegend
    .map(([x, y], i) => {
      if (i === restaurantSizeLegend.length - 1) {
        return [`>= ${x} intl`, y];
      } else if (i === 0) {
        return [`${x} - ${restaurantSizeLegend[i + 1][0]} intl`, y];
      } else {
        return [`${x} - ${restaurantSizeLegend[i + 1][0]} intl`, y];
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
      {!mapState.includes("airbnb") && (
        <div style={{ marginBottom: 12 }}>
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
            <Typography>Airbnb Beds</Typography>
          </div>
          {updatedAirbnbLegend.map((value) => {
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
                      backgroundColor: map3InfoArray[0].color,
                      borderRadius: value[1] / 4,
                      marginRight: 6,
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
        </div>
      )}
      {!mapState.includes("restaurants") && (
        <div style={{ marginBottom: 12 }}>
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
            <Typography>Internationality</Typography>
          </div>
          {updatedRestaurantLegend.map((value) => {
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
                      backgroundColor: map3InfoArray[1].color,
                      borderRadius: value[1] / 4,
                      marginRight: 6,
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
        </div>
      )}
    </div>
  );
}
