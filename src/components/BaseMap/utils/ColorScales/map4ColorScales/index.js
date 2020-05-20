import * as d3 from "d3";
const hexRgb = require("hex-rgb");

const tourismIndexSplit = [0.5, 1, 2, 4];
export const tourismIndexLegend = [0, ...tourismIndexSplit].map((a, i) => [
  a,
  d3.schemeReds[5][i],
]);

const internationalitySplit = [1.5, 2.25, 3];
export const internationalityLegend = [
  0,
  ...internationalitySplit,
].map((a, i) => [a, d3.schemeBlues[4][i]]);

const bedsSplit = [4, 8, 12, 18];
export const bedsLegend = [0, ...bedsSplit].map((a, i) => [
  a,
  d3.schemeGreens[5][i],
]);

export const tourismIndexColorScale = (i, mapState) => {
  var x = d3.scaleThreshold().domain(tourismIndexSplit).range(d3.schemeReds[5])(
    i
  );
  if (mapState.includes(x) || i <= 0) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

export const internationalityColorScale = (i, mapState) => {
  var x = d3
    .scaleThreshold()
    .domain(internationalitySplit)
    .range(d3.schemeBlues[4])(i);
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
