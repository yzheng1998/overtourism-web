import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  _MapContext as MapContext,
  StaticMap,
  NavigationControl,
} from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { MapController } from "deck.gl";
import renderLayer from "./utils/Layers";

import Map1Legend from "../Legend/Map1Legend";
import Map2Legend from "../Legend/Map2Legend";
import Map3Legend from "../Legend/Map3Legend";
import Map4Legend from "../Legend/Map4Legend";
import Map5Legend from "../Legend/Map5Legend";
import Map6Legend from "../Legend/Map6Legend";
import Map3SizeLegend from "../Legend/Map3SizeLegend";
import Map5SizeLegend from "../Legend/Map5SizeLegend";

import InfoMenu from "../InfoMenu";
import ToolTip from "./ToolTip";

import { Fab } from "@material-ui/core";
import MapSelector from "../Map1Selector";
import Map4Selector from "../Map4Selector";

import UrbanFormSelector from "../UrbanFormSelector";
import LandmarksSelector from "../LandmarksSelector";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoieXpoZW5nMTk5OCIsImEiOiJjazhqM2d2c3EwMzdlM2dwanc0Nnc1bW5wIn0.zee4RAVq4YvHdnWIKGSZ-w"; // eslint-disable-line

const INITIAL_VIEW_STATE = {
  latitude: 45.437545,
  longitude: 12.333794,
  zoom: 13,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};

const styles = (theme) => ({
  fab: {
    zIndex: 1,
    marginLeft: 20,
    marginTop: 20,
    backgroundColor: "#2e2e2e",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Helvetica",
  },
});

class BaseMap extends Component {
  state = {
    hoveredObject: null,
    clickedObject: null,
    showMapSelector: false,
    showInfoMenu: false,
    layerIndex: 1,
    visibleInfo: [],
    mapState: [],
    map3State: [
      "designerStores",
      "jewelryShops",
      "restaurants",
      "souvenirShops",
    ],
    urbanFormState: [],
  };

  toggleDrawer = () => {
    this.setState({ showMapSelector: !this.state.showMapSelector });
  };

  onHover = (info) => {
    const { x, y, object, layer } = info;
    this.setState({
      x,
      y,
      hoveredObject: object,
      hoveredLayer: layer.id,
      show:
        object &&
        typeof layer.props.getFillColor === "function" &&
        layer.props.getFillColor(object)[3] !== 0,
    });
  };

  onClick = ({ x, y, object }) => {
    this.setState({
      x_clicked: x,
      y_clicked: y,
      clickedObject: object,
      showInfoMenu: true,
    });
  };

  onClose = () => {
    this.setState({ showMapSelector: false });
  };

  onInfoMenuClose = () => {
    this.setState({ showInfoMenu: false });
  };

  handleToggle = (value, stateName) => {
    const i = this.state[stateName].indexOf(value);
    const updatedmap1State = [...this.state[stateName]];
    if (i === -1) {
      updatedmap1State.push(value);
    } else {
      updatedmap1State.splice(i, 1);
    }
    this.setState({ [stateName]: updatedmap1State });
  };

  render() {
    const { classes, mapIndex } = this.props;
    const mapStyle =
      mapIndex === 2
        ? "mapbox://styles/yzheng1998/ckah9prf1005m1io8dzpidxw1"
        : "mapbox://styles/yzheng1998/ckb19b6hc1kam1ip6g67eyy2m";
    const {
      layerIndex,
      mapState,
      map3State,
      showMapSelector,
      showInfoMenu,
      hoveredObject,
      clickedObject,
      urbanFormState,
    } = this.state;
    return (
      <>
        {mapIndex === 1 && (
          <>
            <MapSelector
              showMapSelector={showMapSelector}
              onClose={() => this.onClose()}
              layerIndex={layerIndex}
              onSliderChange={(e, val) => this.setState({ layerIndex: val })}
              onClick={(x) => this.setState({ layerIndex: x })}
            />
            <InfoMenu
              showMenu={showInfoMenu}
              onClose={this.onInfoMenuClose}
              clickedObject={clickedObject}
            />
            <Fab classes={{ root: classes.fab }} onClick={this.toggleDrawer}>
              Menu
            </Fab>
          </>
        )}
        <DeckGL
          layers={renderLayer(
            layerIndex,
            this.onHover,
            this.onClick,
            mapState,
            map3State,
            urbanFormState,
            mapIndex
          )}
          ContextProvider={MapContext.Provider}
          initialViewState={INITIAL_VIEW_STATE}
          controller={{ type: MapController, scrollZoom: false }}
        >
          <div className="mapboxgl-ctrl-top-right">
            <NavigationControl
              showCompass={false}
              onViewportChange={(viewport) => this.setState({ viewport })}
            />
          </div>
          <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          ></StaticMap>
          {mapIndex === 1 && (
            <>
              <Map1Legend
                layerIndex={layerIndex}
                mapState={mapState}
                onClick={(x) => this.handleToggle(x, "mapState")}
              ></Map1Legend>
              <LandmarksSelector
                mapState={urbanFormState}
                onClick={(x) => this.handleToggle(x, "urbanFormState")}
              />
            </>
          )}
          {mapIndex === 2 && (
            <>
              <Map2Legend
                mapState={mapState}
                onClick={(x) => this.handleToggle(x, "mapState")}
              />
              <LandmarksSelector
                mapState={urbanFormState}
                onClick={(x) => this.handleToggle(x, "urbanFormState")}
              />
            </>
          )}
          {mapIndex === 3 && (
            <>
              <Map3Legend
                mapState={map3State}
                onClick={(x) => this.handleToggle(x, "map3State")}
              />
              <Map3SizeLegend mapState={map3State} />
              <LandmarksSelector
                position={"top"}
                mapState={urbanFormState}
                onClick={(x) => this.handleToggle(x, "urbanFormState")}
              />
            </>
          )}
          {mapIndex === 4 && (
            <>
              <Map4Selector
                layerIndex={layerIndex}
                onClick={(x) => this.setState({ layerIndex: x })}
              />
              <Map4Legend
                mapState={mapState}
                layerIndex={layerIndex}
                onClick={(x) => this.handleToggle(x, "mapState")}
              />
              <LandmarksSelector
                position={"top"}
                mapState={urbanFormState}
                onClick={(x) => this.handleToggle(x, "urbanFormState")}
              />
            </>
          )}
          {mapIndex === 5 && (
            <>
              <UrbanFormSelector
                mapState={urbanFormState}
                onClick={(x) => this.handleToggle(x, "urbanFormState")}
              />
              <Map5SizeLegend urbanFormState={urbanFormState}>
                <Map5Legend
                  urbanFormState={urbanFormState}
                  mapState={mapState}
                  layerIndex={layerIndex}
                  onClick={(x) => this.handleToggle(x, "mapState")}
                />
              </Map5SizeLegend>
            </>
          )}
          {mapIndex === 6 && (
            <>
              <Map6Legend
                mapState={mapState}
                onClick={(x) => this.handleToggle(x, "mapState")}
              />
              <LandmarksSelector
                mapState={urbanFormState}
                onClick={(x) => this.handleToggle(x, "urbanFormState")}
              />
            </>
          )}
          <ToolTip
            x={this.state.x}
            y={this.state.y}
            hoveredObject={hoveredObject}
            hoveredLayer={this.state.hoveredLayer}
            layerIndex={layerIndex}
            mapIndex={mapIndex}
            show={this.state.show}
          />
        </DeckGL>
      </>
    );
  }
}

export default withStyles(styles)(BaseMap);
