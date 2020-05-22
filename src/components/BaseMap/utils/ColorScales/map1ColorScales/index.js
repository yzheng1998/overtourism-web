import * as d3 from "d3";
const hexRgb = require("hex-rgb");

const popSplit = [20, 50, 100, 150, 200];
export const popLegend = [0, ...popSplit].map((a, i) => [
  a,
  d3.schemeReds[6][i],
]);

const popChangeSplit = [-50, -25, -0.01, 0.01, 50, 100];
export const popChangeLegend = [
  "-100% - -50%",
  "-50% - -25%",
  "-25% - 0%",
  "0%",
  "0% - 50%",
  "50% - 100%",
  ">100%",
]
  .map((a, i) => [a, d3.schemePiYG[7][i]])
  .reverse()
  .concat([["-", "#808080"]]);

const uohSplit = [2, 5, 10, 15, 25];
export const uohLegend = [0, ...uohSplit].map((a, i) => [
  a,
  d3.schemeGreens[6][i],
]);

const uohChangeSplit = [-80, -50, -0.01, 0.01, 100, 400];
export const uohChangeLegend = [
  "-100% - -80%",
  "-80% - -50%",
  "-50% - 0%",
  "0%",
  "0% - 100%",
  "100% - 400%",
  ">400%",
]
  .map((a, i) => [a, d3.schemePuOr[7][i]])
  .reverse()
  .concat([["-", "#808080"]]);

export const popColorScale = (i, mapState) => {
  var x = d3.scaleThreshold().domain(popSplit).range(d3.schemeReds[6])(i);
  if (mapState.includes(x) || i === 0) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const popLineColor = (i, mapState) => {
  return !mapState.includes("#FFFFFF") && i === 0
    ? [140, 140, 140]
    : [0, 0, 0, 0];
};

export const popChangeColorScale = (i, mapState, pop91, pop11) => {
  var x = d3.scaleThreshold().domain(popChangeSplit).range(d3.schemePiYG[7])(i);
  if (pop91 === 0) {
    x = "#808080";
  }
  if (mapState.includes(x) || (pop91 === 0 && pop11 === 0)) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const popChangeLineColor = (mapState, pop91, pop11) => {
  return !mapState.includes("#FFFFFF") && pop91 === 0 && pop11 === 0
    ? [140, 140, 140]
    : [0, 0, 0, 0];
};

export const uohColorScale = (i, mapState) => {
  var x = d3.scaleThreshold().domain(uohSplit).range(d3.schemeGreens[6])(i);
  if (mapState.includes(x) || i === 0) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const uohLineColor = (i, mapState) => {
  return !mapState.includes("#FFFFFF") && i === 0
    ? [140, 140, 140]
    : [0, 0, 0, 0];
};

export const uohChangeColorScale = (i, mapState, uoh91, uoh11) => {
  var x = d3.scaleThreshold().domain(uohChangeSplit).range(d3.schemePuOr[7])(i);
  if (uoh91 === 0) {
    x = "#808080";
  }
  if (mapState.includes(x) || (uoh91 === 0 && uoh11 === 0)) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const uohChangeLineColor = (mapState, uoh91, uoh11) => {
  return !mapState.includes("#FFFFFF") && uoh91 === 0 && uoh11 === 0
    ? [140, 140, 140]
    : [0, 0, 0, 0];
};
