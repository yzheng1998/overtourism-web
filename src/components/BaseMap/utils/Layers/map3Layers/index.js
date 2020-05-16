import { GeoJsonLayer } from "@deck.gl/layers";
import { restaurants } from "../../../../../geojson/restaurants.js";
import { airbnb } from "../../../../../geojson/airbnb.js";
import { jewelryShops } from "../../../../../geojson/jewelry_shops.js";
import { clothingShops } from "../../../../../geojson/clothing_shops.js";
import { maskShops } from "../../../../../geojson/mask_shops.js";

export const map3InfoArray = [
  { id: "airbnb", name: "Airbnbs (Jan 2020)", color: "rgb(0, 0, 255)" },
  { id: "maskShops", name: "Mask Shops", color: "rgb(255, 0, 0)" },
  { id: "clothingShops", name: "Clothing Shops", color: "rgb(182, 252, 207)" },
  { id: "jewelryShops", name: "Jewelry Shops", color: "rgb(207, 23, 185)" },
  { id: "restaurants", name: "Restaurants", color: "rgb(245, 227, 27)" },
];

export default function map3Layers(map3State, onHover, onClick) {
  let layers = [];

  const display = (id) => {
    return !map3State.includes(id);
  };

  const opacity = 1;

  display("maskShops") &&
    layers.push(
      new GeoJsonLayer({
        id: "maskShops",
        data: maskShops,
        opacity,
        getRadius: 20,
        stroked: false,
        getFillColor: [255, 0, 0],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  display("clothingShops") &&
    layers.push(
      new GeoJsonLayer({
        id: "clothingShops",
        data: clothingShops,
        opacity,
        getRadius: 20,
        stroked: false,
        getFillColor: [182, 252, 207],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  display("jewelryShops") &&
    layers.push(
      new GeoJsonLayer({
        id: "jewelryShops",
        data: jewelryShops,
        opacity,
        stroked: false,
        getRadius: 20,
        getFillColor: [207, 23, 185],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  display("restaurants") &&
    layers.push(
      new GeoJsonLayer({
        id: "restaurants",
        data: restaurants,
        opacity,
        stroked: false,
        getRadius: 20,
        getFillColor: [245, 227, 27],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  display("airbnb") &&
    layers.push(
      new GeoJsonLayer({
        id: "airbnb",
        data: airbnb,
        opacity,
        getRadius: 20,
        stroked: false,
        getFillColor: [0, 0, 255],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  return layers;
}
