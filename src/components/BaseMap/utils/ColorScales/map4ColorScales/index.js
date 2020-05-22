import * as d3 from "d3";
const hexRgb = require("hex-rgb");

const schemeBuRd = [
  "#053061",
  "#2166ac",
  "#4393c3",
  "#92c5de",
  "#d1e5f0",
  "#f7f7f7",
  "#fddbc7",
  "#f4a582",
  "#d6604d",
  "#b2182b",
  "#67001f",
];
const tourismIndexSplit = [-6, -4, -2, -1, -0.05, 0.05, 1, 2, 4, 6];
const tourismIndexLegendArr = [
  "<-6",
  "-6",
  "-4 - -2",
  "-2 - -1",
  "-1 - -0.05",
  " -.05 - 0.05",
  "0.05 - 1",
  "1 - 2",
  "2 - 4",
  "4 - 6",
  ">6",
];
export const tourismIndexLegend = tourismIndexLegendArr.map((a, i) => [
  a,
  schemeBuRd[i],
]);

export const tourismLineColor = (i, mapState) => {
  return !mapState.includes("#FFFFFF") && i === 0
    ? [140, 140, 140]
    : [0, 0, 0, 0];
};

const internationalitySplit = [0.15, 0.33, 0.5, 0.67];
export const internationalityLegend = [
  0,
  ...internationalitySplit,
].map((a, i) => [a, d3.schemeBlues[5][i]]);

export const intlLineColor = (i, mapState) => {
  return !mapState.includes("#FFFFFF") && i <= 0
    ? [140, 140, 140]
    : [0, 0, 0, 0];
};

const bedsSplit = [2, 6, 10, 16];
export const bedsLegend = [0, ...bedsSplit].map((a, i) => [
  a,
  d3.schemeGreens[5][i],
]);
export const bedsLineColor = (i, mapState) => {
  return !mapState.includes("#FFFFFF") && i === 0
    ? [140, 140, 140]
    : [0, 0, 0, 0];
};

export const tourismIndexColorScale = (i, mapState) => {
  var x = d3.scaleThreshold().domain(tourismIndexSplit).range(schemeBuRd)(i);
  if (mapState.includes(x) || i === 0) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const internationalityColorScale = (i, mapState) => {
  var x = d3
    .scaleThreshold()
    .domain(internationalitySplit)
    .range(d3.schemeBlues[5])(i);
  if (mapState.includes(x) || i <= 0) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const bedsColorScale = (i, mapState) => {
  var x = d3.scaleThreshold().domain(bedsSplit).range(d3.schemeGreens[5])(i);
  if (mapState.includes(x) || i === 0) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};
