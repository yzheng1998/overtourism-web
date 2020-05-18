import map1Layers from "./map1Layers";
import map2Layers from "./map2Layers";
import map3Layers from "./map3Layers";
import map4Layers from "./map4Layers";
import map5Layers from "./map5Layers";
import map6Layers from "./map6Layers";

export default function renderLayer(
  layerIndex,
  onHover,
  onClick,
  map1State,
  map2State,
  map3State,
  map4State,
  map5State,
  map6State,
  mapIndex
) {
  var layers = [];

  if (mapIndex === 1) {
    layers.push(map1Layers(layerIndex, map1State, onHover, onClick));
  }

  if (mapIndex === 2) {
    layers.push(map2Layers(map2State, onHover));
  }

  if (mapIndex === 3) {
    layers.push(map3Layers(map3State, onHover));
  }

  if (mapIndex === 4) {
    layers.push(map4Layers(map4State, onHover));
  }

  if (mapIndex === 5) {
    layers.push(map5Layers(map5State, onHover));
  }

  if (mapIndex === 6) {
    layers.push(map6Layers(map6State, onHover));
  }

  return layers;
}
