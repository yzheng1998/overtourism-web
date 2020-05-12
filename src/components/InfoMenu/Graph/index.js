import React from "react";
import { ResponsiveLine } from "@nivo/line";

export default function Graph(props) {
  const { data, label, color } = props;

  const theme = {
    axis: {
      legend: {
        text: {
          fill: "#FFFFFF",
          fontFamily: "Helvetica",
        },
      },
      ticks: {
        line: {
          stroke: "#FFFFFF",
        },
        text: {
          fill: "#FFFFFF",
          fontFamily: "Helvetica",
        },
      },
    },
    grid: {
      line: {
        stroke: "#FFFFFF",
      },
    },
  };

  return (
    <ResponsiveLine
      theme={theme}
      data={data}
      margin={{ top: 30, right: 60, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      textColor="#FFFFFF"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Year",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: label,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={color}
      pointSize={6}
      pointBorderWidth={0}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
    />
  );
}
