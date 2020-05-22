import * as d3 from "d3";
const hexRgb = require("hex-rgb");

const builtSplit = [0.15, 0.35, 0.5, 0.67, 0.9];
export const builtLegend = [0, ...builtSplit].map((a, i) => [
  a,
  d3.schemeReds[6][i],
]);

const waterSplit = builtSplit;
export const waterLegend = [0, ...waterSplit].map((a, i) => [
  a,
  d3.schemeBlues[6][i],
]);

const openSplit = builtSplit;
export const openLegend = [0, ...openSplit].map((a, i) => [
  a,
  d3.schemeGreens[6][i],
]);

export const builtColorScale = (i, mapState) => {
  var x = d3.scaleThreshold().domain(builtSplit).range(d3.schemeReds[6])(i);
  if (i <= 0) x = "#FFFFFF";
  if (mapState.includes(x)) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const waterColorScale = (i, mapState) => {
  var x = d3.scaleThreshold().domain(builtSplit).range(d3.schemeBlues[6])(i);
  if (i <= 0) x = "#FFFFFF";
  if (mapState.includes(x)) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const openColorScale = (i, mapState) => {
  var x = d3.scaleThreshold().domain(builtSplit).range(d3.schemeGreens[6])(i);
  if (mapState.includes(x) || i <= 0) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const openLineColor = (i, mapState) => {
  return !mapState.includes("#FFFFFF") && i === 0
    ? [140, 140, 140]
    : [0, 0, 0, 0];
};
