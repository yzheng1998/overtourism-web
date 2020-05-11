import * as d3 from "d3";
const hexRgb = require("hex-rgb");

const popSplit = [0, 20, 56, 95, 140, 227];
export const popLegend = popSplit.map((a, i) => [a, d3.schemeReds[6][i]]);

const popChangeSplit = [
  -100,
  -48,
  -33,
  -24,
  -13,
  0,
  335,
  670,
  1005,
  1339,
  1674,
];
export const popChangeLegend = popChangeSplit.map((a, i) => [
  a,
  d3.schemePuOr[11][i],
]);

const uohSplit = [0, 2, 5, 9, 15, 25];
export const uohLegend = uohSplit.map((a, i) => [a, d3.schemeGreens[6][i]]);

const uohChangeSplit = [-100, -29, -19, -10, 0, 25, 86, 216, 26643];
export const uohChangeLegend = uohChangeSplit.map((a, i) => [
  a,
  d3.schemePuOr[9][i],
]);

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
    d3.schemePuOr[11]
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
    d3.schemePuOr[9]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );
