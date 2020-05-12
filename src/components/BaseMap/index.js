import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import renderLayer from "./utils/Layers";

import InfoSelector from "../InfoSelector";
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
    toggleState: [],
    visibleInfo: [],
    infoToggleState: [],
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

  handleToggle = (value) => {
    const i = this.state.toggleState.indexOf(value);
    const updatedToggleState = [...this.state.toggleState];
    if (i === -1) {
      updatedToggleState.push(value);
    } else {
      updatedToggleState.splice(i, 1);
    }
    this.setState({ toggleState: updatedToggleState });
  };

  handleInfoToggle = (value) => {
    const i = this.state.infoToggleState.indexOf(value);
    const updatedToggleState = [...this.state.infoToggleState];
    if (i === -1) {
      updatedToggleState.push(value);
    } else {
      updatedToggleState.splice(i, 1);
    }
    this.setState({ infoToggleState: updatedToggleState });
  };

  render() {
    const { classes } = this.props;
    const mapStyle = "mapbox://styles/mapbox/dark-v10";
    const {
      layerIndex,
      toggleState,
      showMapSelector,
      showInfoMenu,
      hoveredObject,
      clickedObject,
      infoToggleState,
    } = this.state;

    return (
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
        <DeckGL
          layers={renderLayer(
            layerIndex,
            this.onHover,
            this.onClick,
            toggleState,
            infoToggleState
          )}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
        >
          <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
          <Legend
            layerIndex={layerIndex}
            toggleState={toggleState}
            onClick={this.handleToggle}
          ></Legend>
          <InfoSelector
            infoToggleState={infoToggleState}
            onClick={this.handleInfoToggle}
          />
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
