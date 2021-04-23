import { GeoJsonLayer, IconLayer } from "@deck.gl/layers";
import { restaurants } from "../../../../../geojson/restaurants.js";
import { airbnb } from "../../../../../geojson/airbnb.js";
import { jewelryShops } from "../../../../../geojson/jewelry_shops.js";
import { clothingShops } from "../../../../../geojson/clothing_shops.js";
import { maskShops } from "../../../../../geojson/mask_shops.js";
import { landmarks } from "../../../../../geojson/landmarks.js";
import { souvenirShops } from "../../../../../geojson/souvenir_shops.js";
import Masks from "../../../../../assets/masks.png";
import Bag from "../../../../../assets/bag.png";
import Diamond from "../../../../../assets/diamond.png";
import Gift from "../../../../../assets/gift.png";

import {
  restaurantSizeScale,
  airbnbSizeScale,
} from "../../ColorScales/map3ColorScales";

export const map3InfoArray = [
  { id: "airbnb", name: "Airbnbs (Jan 2020)", color: "rgb(255, 90, 95)" },
  { id: "restaurants", name: "Restaurants", color: "rgb(48, 210, 255)" },
  {
    id: "maskShops",
    name: "Mask Shops",
    color: "rgb(139, 0, 0)",
    icon: Masks,
    filter: `invert(9%) sepia(95%) saturate(4824%) hue-rotate(357deg) brightness(83%) contrast(109%)`,
  },
  {
    id: "designerStores",
    name: "Designer Stores",
    color: "rgb(0, 100, 0)",
    icon: Bag,
    filter: `invert(19%) sepia(46%) saturate(4293%) hue-rotate(98deg) brightness(96%) contrast(105%)`,
  },
  {
    id: "jewelryShops",
    name: "Jewelry Shops",
    color: "rgb(5, 48, 97)",
    icon: Diamond,
    filter: `invert(15%) sepia(15%) saturate(6817%) hue-rotate(192deg) brightness(98%) contrast(101%)`,
  },
  {
    id: "souvenirShops",
    name: "Souvenir Shops",
    color: "rgb(128, 0, 128)",
    icon: Gift,
    filter: `invert(7%) sepia(78%) saturate(7399%) hue-rotate(298deg) brightness(93%) contrast(100%)`,
  },
];

export default function map3Layers(mapState, urbanFormState, onHover, onClick) {
  var layers = [];

  const display = (id) => {
    return !mapState.includes(id);
  };

  const opacity = 0.8;

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

  const ICON_MAPPING = {
    maskShops: { x: 0, y: 0, width: 980, height: 466, mask: true },
    designerStores: { x: 0, y: 0, width: 512, height: 512, mask: true },
    jewelryShops: { x: 0, y: 0, width: 512, height: 512, mask: true },
    souvenirShops: { x: 0, y: 0, width: 512, height: 512, mask: true },
  };

  display("designerStores") &&
    layers.push(
      new IconLayer({
        id: "designerStores",
        data: clothingShops.features,
        iconAtlas: Bag,
        iconMapping: ICON_MAPPING,
        sizeScale: 1,
        getColor: [0, 100, 0],
        getSize: 23,
        pickable: true,
        getPosition: (d) => [...d.geometry.coordinates, 0],
        getIcon: (d) => "designerStores",
        onHover,
      })
    );

  display("jewelryShops") &&
    layers.push(
      new IconLayer({
        id: "jewelryShops",
        data: jewelryShops.features,
        iconAtlas: Diamond,
        iconMapping: ICON_MAPPING,
        sizeScale: 1,
        getColor: [5, 48, 97],
        getSize: 23,
        pickable: true,
        getPosition: (d) => [...d.geometry.coordinates, 0],
        getIcon: (d) => "jewelryShops",
        onHover,
      })
    );

  display("souvenirShops") &&
    layers.push(
      new IconLayer({
        id: "souvenirShops",
        data: souvenirShops.features,
        iconAtlas: Gift,
        iconMapping: ICON_MAPPING,
        sizeScale: 1,
        getColor: [128, 0, 128],
        getSize: 23,
        pickable: true,
        getPosition: (d) => [...d.geometry.coordinates[0], 0],
        getIcon: (d) => "souvenirShops",
        onHover,
      })
    );

  display("maskShops") &&
    layers.push(
      new IconLayer({
        id: "maskShops",
        data: maskShops.features,
        iconAtlas: Masks,
        iconMapping: ICON_MAPPING,
        sizeScale: 1,
        getColor: [139, 0, 0],
        getSize: 20,
        pickable: true,
        getPosition: (d) => [...d.geometry.coordinates, 0],
        getIcon: (d) => "maskShops",
        onHover,
      })
    );

  return layers;
}
