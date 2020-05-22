import { GeoJsonLayer } from "@deck.gl/layers";
import { restaurants } from "../../../../../geojson/restaurants.js";
import { airbnb } from "../../../../../geojson/airbnb.js";
import { jewelryShops } from "../../../../../geojson/jewelry_shops.js";
import { clothingShops } from "../../../../../geojson/clothing_shops.js";
import { maskShops } from "../../../../../geojson/mask_shops.js";
import { landmarks } from "../../../../../geojson/landmarks.js";

import {
  restaurantSizeScale,
  airbnbSizeScale,
} from "../../ColorScales/map3ColorScales";

export const map3InfoArray = [
  { id: "airbnb", name: "Airbnbs (Jan 2020)", color: "rgb(255, 90, 95)" },
  { id: "restaurants", name: "Restaurants", color: "rgb(48, 210, 255)" },
  { id: "maskShops", name: "Mask Shops", color: "rgb(255, 0, 255)" },
  { id: "designerStores", name: "Designer Stores", color: "rgb(0, 140, 0)" },
  { id: "jewelryShops", name: "Jewelry Shops", color: "rgb(255, 215, 0)" },
];

export default function map3Layers(mapState, urbanFormState, onHover, onClick) {
  var layers = [];

  const display = (id) => {
    return !mapState.includes(id);
  };

  const opacity = 0.8;

  display("airbnb") &&
    layers.push(
      new GeoJsonLayer({
        id: "airbnb",
        data: airbnb,
        opacity: 0.5,
        getRadius: (f) => airbnbSizeScale(f.properties.beds),
        stroked: false,
        getFillColor: [255, 90, 95],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  display("maskShops") &&
    layers.push(
      new GeoJsonLayer({
        id: "maskShops",
        data: maskShops,
        opacity,
        getRadius: 15,
        pointRadiusMaxPixels: 5,
        stroked: false,
        getFillColor: [255, 0, 255],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  display("designerStores") &&
    layers.push(
      new GeoJsonLayer({
        id: "designerStores",
        data: clothingShops,
        opacity,
        getRadius: 15,
        pointRadiusMaxPixels: 5,
        stroked: false,
        getFillColor: [0, 140, 0],
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
        getRadius: 15,
        pointRadiusMaxPixels: 5,
        getFillColor: [255, 215, 0],
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
        opacity: 0.5,
        stroked: false,
        getRadius: (f) => restaurantSizeScale(f.properties.composite_ital_3),
        getFillColor: [48, 210, 255],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  !urbanFormState.includes(1) &&
    layers.push(
      new GeoJsonLayer({
        id: "landmarks",
        data: landmarks,
        opacity,
        getLineColor: [255, 255, 255, 0],
        getFillColor: [0, 0, 0],
        pickable: true,
        onHover: onHover,
        onClick: onClick,
      })
    );

  return layers;
}
