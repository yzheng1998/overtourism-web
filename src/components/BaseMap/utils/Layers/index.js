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
  mapState,
  map3State,
  urbanFormState,
  mapIndex
) {
  var layers = [];

  switch (mapIndex) {
    case 1:
      layers.push(
        map1Layers(layerIndex, mapState, urbanFormState, onHover, onClick)
      );
      break;
    case 2:
      layers.push(map2Layers(mapState, urbanFormState, onHover));
      break;
    case 3:
      layers.push(map3Layers(map3State, urbanFormState, onHover));
      break;
    case 4:
      layers.push(map4Layers(layerIndex, mapState, urbanFormState, onHover));
      break;
    case 5:
      layers.push(map5Layers(layerIndex, mapState, urbanFormState, onHover));
      break;
    case 6:
      layers.push(map6Layers(mapState, urbanFormState, onHover));
      break;
    default:
      break;
  }

  return layers;
}
