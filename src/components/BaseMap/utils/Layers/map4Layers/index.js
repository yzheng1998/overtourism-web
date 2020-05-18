import { GeoJsonLayer } from "@deck.gl/layers";
import { hexagonMapping } from "../../../../../geojson/hexagon_mapping.js";

export const map3InfoArray = [
  { id: "tourismIndex", name: "Tourism Index", color: "rgb(0, 0, 255)" },
  { id: "maskShops", name: "Mask Shops", color: "rgb(255, 0, 0)" },
  { id: "clothingShops", name: "Clothing Shops", color: "rgb(182, 252, 207)" },
  { id: "jewelryShops", name: "Jewelry Shops", color: "rgb(207, 23, 185)" },
  { id: "restaurants", name: "Restaurants", color: "rgb(245, 227, 27)" },
];

export default function map3Layers(map3State, onHover, onClick) {
  var layers = [];

  const display = (id) => {
    return !map3State.includes(id);
  };

  const opacity = 1;

  return layers;
}
