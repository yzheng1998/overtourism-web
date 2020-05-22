import * as d3 from "d3";
const hexRgb = require("hex-rgb");

const restaurantSplit = [1, 2, 3, 4];
export const restaurantLegend = [0, ...restaurantSplit].map((a, i) => [
  a,
  d3.schemeBlues[5][i],
]);

export const restaurantColorScale = (i, mapState) => {
  var x = d3.scaleThreshold().domain(restaurantSplit).range(d3.schemeBlues[5])(
    i
  );
  if (i <= 0) x = "#FFFFFF";
  if (mapState.includes(x)) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};

const restaurantSizeSplit = [1, 2, 3, 4];
export const restaurantSizeLegend = [0, ...restaurantSizeSplit].map((a, i) => [
  a,
  [4, 8, 16, 48, 96][i],
]);

export const restaurantSizeScale = (i) =>
  d3.scaleThreshold().domain(restaurantSizeSplit).range([4, 8, 16, 48, 96])(i);

const airbnbSizeSplit = [3, 6, 9, 12, 15];
export const airbnbSizeLegend = [0, ...airbnbSizeSplit].map((a, i) => [
  a,
  [4, 8, 16, 48, 96, 192][i],
]);

export const airbnbSizeScale = (i) =>
  d3.scaleThreshold().domain(airbnbSizeSplit).range([4, 8, 16, 48, 96, 192])(i);
