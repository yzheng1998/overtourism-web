import * as d3 from "d3";
const hexRgb = require("hex-rgb");

const popSplit = [20, 50, 100, 150, 200];
export const popLegend = [0, ...popSplit].map((a, i) => [
  a,
  d3.schemeReds[6][i],
]);

const popChangeSplit = [0.2, 0.5, 0.99, 1.01, 2, 5];
export const popChangeLegend = [
  "<1/5x",
  "1/5x - 1/2x",
  "1/2x - 1x",
  "No Change",
  "1x - 2x",
  "2x - 5x",
  ">5x",
]
  .map((a, i) => [a, d3.schemePuOr[7][i]])
  .reverse()
  .concat([["NaN", "#808080"]]);

const uohSplit = [2, 5, 10, 15, 25];
export const uohLegend = [0, ...uohSplit].map((a, i) => [
  a,
  d3.schemeGreens[6][i],
]);

const uohChangeSplit = popChangeSplit;
export const uohChangeLegend = [
  "<1/5x",
  "1/5x - 1/2x",
  "1/2x - 1x",
  "No Change",
  "1x - 2x",
  "2x - 5x",
  ">5x",
]
  .map((a, i) => [a, d3.schemePuOr[7][i]])
  .reverse()
  .concat([["NaN", "#808080"]]);

export const COLOR_SCALE = d3
  .scaleThreshold()
  .domain(popSplit)
  .range(
    d3.schemeReds[6]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

export const COLOR_SCALE_change = d3
  .scaleThreshold()
  .domain(popChangeSplit)
  .range(
    d3.schemePuOr[7]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

export const COLOR_SCALE_UOH = d3
  .scaleThreshold()
  .domain(uohSplit)
  .range(
    d3.schemeGreens[6]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

export const COLOR_SCALE_change_UOH = d3
  .scaleThreshold()
  .domain(uohChangeSplit)
  .range(
    d3.schemePuOr[7]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );
