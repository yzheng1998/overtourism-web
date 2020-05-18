import * as d3 from "d3";
const hexRgb = require("hex-rgb");

const popSplit = [20, 50, 100, 150, 200];
export const popLegend = [0, ...popSplit].map((a, i) => [
  a,
  d3.schemeReds[6][i],
]);

const popChangeSplit = [0.5, 0.75, 0.99, 1.01, 1.5, 2];
export const popChangeLegend = [
  "<.5x",
  ".5x - .75x",
  ".75x - 1x",
  "No Change",
  "1x - 1.5x",
  "1.5x - 2x",
  ">2x",
]
  .map((a, i) => [a, d3.schemePiYG[7][i]])
  .reverse()
  .concat([["NaN", "#808080"]]);

const uohSplit = [2, 5, 10, 15, 25];
export const uohLegend = [0, ...uohSplit].map((a, i) => [
  a,
  d3.schemeGreens[6][i],
]);

const uohChangeSplit = [0.2, 0.5, 0.99, 1.01, 2, 5];
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

export const popColorScale = (i, mapState) => {
  var x = d3.scaleThreshold().domain(popSplit).range(d3.schemeReds[6])(i);
  if (i === 0) x = "#FFFFFF";
  if (mapState.includes(x)) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const popChangeColorScale = (i, mapState, pop91, pop11) => {
  var x = d3.scaleThreshold().domain(popChangeSplit).range(d3.schemePiYG[7])(i);
  if (pop91 === 0 && pop11 === 0) {
    x = "#f7f7f7";
  } else if (pop91 === 0) {
    x = "#808080";
  }
  if (mapState.includes(x)) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const uohColorScale = (i, mapState) => {
  var x = d3.scaleThreshold().domain(uohSplit).range(d3.schemeGreens[6])(i);
  if (i === 0) x = "#FFFFFF";
  if (mapState.includes(x)) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const uohChangeColorScale = (i, mapState, uoh91, uoh11) => {
  var x = d3.scaleThreshold().domain(uohChangeSplit).range(d3.schemePuOr[7])(i);
  if (uoh91 === 0 && uoh11 === 0) {
    x = "#f7f7f7";
  } else if (uoh91 === 0) {
    x = "#808080";
  }
  if (mapState.includes(x)) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};
