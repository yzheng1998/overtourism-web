import * as d3 from "d3";
const hexRgb = require("hex-rgb");

const restaurantSplit = [1.5, 2, 2.5, 3];
export const restaurantLegend = [0, ...restaurantSplit].map((a, i) => [
  a,
  d3.schemeReds[5][i],
]);

export const restaurantColorScale = (i, mapState) => {
  var x = d3.scaleThreshold().domain(restaurantSplit).range(d3.schemeReds[5])(
    i
  );
  if (i <= 0) x = "#FFFFFF";
  if (mapState.includes(x)) {
    return hexRgb(x, { format: "array" }).slice(0, 3).concat([0]);
  } else return hexRgb(x, { format: "array" }).slice(0, 3);
};
