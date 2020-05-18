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

import Map2Legend from "../Legend/Map2Legend";
import Map3Legend from "../Legend/Map3Legend";
import InfoMenu from "../InfoMenu";
import Legend from "../Legend";
import ToolTip from "./ToolTip";

import { Fab } from "@material-ui/core";
import MapSelector from "../MapSelector";

// Set your mapbox token here
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
    layerIndex: 0,
    visibleInfo: [],
    map1State: [],
    map2State: [],
    map3State: [],
    map4State: [],
    map5State: [],
    map6State: [],
  };
  toggleDrawer = () => {
    this.setState({ showMapSelector: !this.state.showMapSelector });
  };

  onHover = ({ x, y, object }) => {
    this.setState({ x, y, hoveredObject: object });
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
    const mapStyle = "mapbox://styles/mapbox/dark-v10";
    console.log("mapIndex", mapIndex);
    const {
      layerIndex,
      map1State,
      showMapSelector,
      showInfoMenu,
      hoveredObject,
      clickedObject,
      map2State,
      map3State,
      map4State,
      map5State,
      map6State,
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
            map1State,
            map2State,
            map3State,
            map4State,
            map5State,
            map6State,
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
            <Legend
              layerIndex={layerIndex}
              map1State={map1State}
              onClick={(x) => this.handleToggle(x, "map1State")}
            ></Legend>
          )}
          {mapIndex === 2 && (
            <Map2Legend
              map2State={map2State}
              onClick={(x) => this.handleToggle(x, "map2State")}
            />
          )}
          {mapIndex === 3 && (
            <Map3Legend
              map3State={map3State}
              onClick={(x) => this.handleToggle(x, "map3State")}
            />
          )}

          <ToolTip
            x={this.state.x}
            y={this.state.y}
            hoveredObject={hoveredObject}
            layerIndex={layerIndex}
          />
        </DeckGL>
      </>
    );
  }
}

export default withStyles(styles)(BaseMap);
