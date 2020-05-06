import React, { Component } from "react";
import { render } from "react-dom";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";

import * as d3 from "d3";

import { hexagon } from "./geojson/hexagon.js";

import InfoMenu from "./components/InfoMenu";
import Legend from "./components/Legend";

import { Fab } from "@material-ui/core";
import Menu from "./components/menu";

const hexRgb = require("hex-rgb");
// Set your mapbox token here
const MAPBOX_TOKEN =
  "pk.eyJ1IjoieXpoZW5nMTk5OCIsImEiOiJjazhqM2d2c3EwMzdlM2dwanc0Nnc1bW5wIn0.zee4RAVq4YvHdnWIKGSZ-w"; // eslint-disable-line

// Source data GeoJSON
const popSplit = [0, 20, 56, 95, 140, 227];
const popLegend = popSplit.map((a, i) => [a, d3.schemeReds[6][i]]);

const popChangeSplit = [
  -100,
  -48,
  -33,
  -24,
  -13,
  0,
  335,
  670,
  1005,
  1339,
  1674,
];
const popChangeLegend = popChangeSplit.map((a, i) => [a, d3.schemePuOr[11][i]]);

const uohSplit = [0, 2, 5, 9, 15, 25];
const uohLegend = uohSplit.map((a, i) => [a, d3.schemeGreens[6][i]]);

const uohChangeSplit = [-100, -29, -19, -10, 0, 25, 86, 216, 26643];
const uohChangeLegend = uohChangeSplit.map((a, i) => [a, d3.schemePuOr[9][i]]);

export const COLOR_SCALE = d3
  .scaleThreshold()
  .domain(popSplit)
  .range(
    d3.schemeReds[6]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

export const COLOR_SCALE_change = d3
  .scaleThreshold()
  .domain(popChangeSplit)
  .range(
    d3.schemePuOr[11]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

export const COLOR_SCALE_UOH = d3
  .scaleThreshold()
  .domain(uohSplit)
  .range(
    d3.schemeGreens[6]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

export const COLOR_SCALE_change_UOH = d3
  .scaleThreshold()
  .domain(uohChangeSplit)
  .range(
    d3.schemePuOr[9]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

const INITIAL_VIEW_STATE = {
  latitude: 45.437545,
  longitude: 12.333794,
  zoom: 13,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredObject: null,
      clickedObject: null,
      showMenu: false,
      showInfoMenu: false,
      showMap: 0,
    };
    this._onHover = this._onHover.bind(this);
    this._onClick = this._onClick.bind(this);
    this._renderTooltip = this._renderTooltip.bind(this);
  }

  toggleDrawer() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  _onHover({ x, y, object }) {
    this.setState({ x, y, hoveredObject: object });
  }

  _onClick({ x, y, object }) {
    this.setState({
      x_clicked: x,
      y_clicked: y,
      clickedObject: object,
      showInfoMenu: true,
    });
    console.log(this.state.clickedObject);
  }

  onClose() {
    this.setState({ showMenu: false });
  }

  onInfoMenuClose() {
    this.setState({ showInfoMenu: false });
  }

  _renderLayers() {
    let layers = [];

    const opacity = 1;

    if (this.state.showMap === 0) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => {
            if (f.properties.pop_91 === 0) return [255, 255, 255];
            else return COLOR_SCALE(f.properties.pop_91);
          },
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["pop_91"],
          },
        })
      );
    }

    if (this.state.showMap === 1) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => {
            if (f.properties.pop_01 === 0) return [255, 255, 255];
            else return COLOR_SCALE(f.properties.pop_01);
          },
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["pop_01"],
          },
        })
      );
    }

    if (this.state.showMap === 2) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => {
            if (f.properties.pop_11 === 0) return [255, 255, 255];
            else return COLOR_SCALE(f.properties.pop_11);
          },
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["pop_11"],
          },
        })
      );
    }

    if (this.state.showMap === 3) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => {
            if (f.properties.pop_91 === 0 && f.properties.pop_11 === 0) {
              return [255, 255, 255];
            } else if (f.properties.pop_91 === 0) {
              return [128, 128, 128];
            } else return COLOR_SCALE_change(f.properties.pop_pchang);
          },
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["pop_pchang"],
          },
        })
      );
    }

    if (this.state.showMap === 4) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => {
            if (f.properties.uoh_91 === 0) return [255, 255, 255];
            else return COLOR_SCALE_UOH(f.properties.uoh_91);
          },
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["uoh_91"],
          },
        })
      );
    }

    if (this.state.showMap === 5) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => {
            if (f.properties.uoh_01 === 0) return [255, 255, 255];
            else return COLOR_SCALE_UOH(f.properties.uoh_01);
          },
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["uoh_01"],
          },
        })
      );
    }

    if (this.state.showMap === 6) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => {
            if (f.properties.uoh_11 === 0) return [255, 255, 255];
            else return COLOR_SCALE_UOH(f.properties.uoh_11);
          },
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["uoh_11"],
          },
        })
      );
    }

    if (this.state.showMap === 7) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => {
            if (f.properties.uoh_91 === 0 && f.properties.uoh_11 === 0) {
              return [255, 255, 255];
            } else if (f.properties.uoh_91 === 0) {
              return [128, 128, 128];
            } else return COLOR_SCALE_change_UOH(f.properties.uoh_pchang);
          },
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["uoh_change"],
          },
        })
      );
    }

    return layers;
  }

  _renderTooltip() {
    const { x, y, hoveredObject } = this.state;
    return (
      hoveredObject && (
        <div className="tooltip" style={{ top: y, left: x }}>
          {this.state.showMap === 0 && (
            <>
              <b>Population</b>
              <div>{parseInt(hoveredObject.properties.pop_91)} people</div>
            </>
          )}
          {this.state.showMap === 1 && (
            <>
              <b>Population</b>
              <div>{parseInt(hoveredObject.properties.pop_01)} people</div>
            </>
          )}
          {this.state.showMap === 2 && (
            <>
              <b>Population</b>
              <div>{parseInt(hoveredObject.properties.pop_11)} people</div>
            </>
          )}
          {this.state.showMap === 3 && (
            <>
              <b>Population Percent Change</b>
              <div>{parseInt(hoveredObject.properties.pop_pchang)} %</div>
            </>
          )}
          {this.state.showMap === 4 && (
            <>
              <b>Unoccupied Dwellings</b>
              <div>{parseInt(hoveredObject.properties.uoh_91)} dwellings</div>
            </>
          )}
          {this.state.showMap === 5 && (
            <>
              <b>Unoccupied Dwellings</b>
              <div>{parseInt(hoveredObject.properties.uoh_01)} dwellings</div>
            </>
          )}
          {this.state.showMap === 6 && (
            <>
              <b>Unoccupied Dwellings</b>
              <div>{parseInt(hoveredObject.properties.uoh_11)} dwellings</div>
            </>
          )}
          {this.state.showMap === 7 && (
            <>
              <b>Unoccupied Dwellings Percent Change</b>
              <div>{parseInt(hoveredObject.properties.uoh_pchang)} %</div>
            </>
          )}
        </div>
      )
    );
  }

  renderLegend() {
    const { showMap } = this.state;
    if (showMap >= 0 && showMap < 3) {
      return popLegend;
    } else if (showMap === 3) {
      return popChangeLegend;
    } else if (showMap > 3 && showMap < 7) {
      return uohLegend;
    } else if (showMap === 7) {
      return uohChangeLegend;
    }
  }

  render() {
    const { mapStyle = "mapbox://styles/mapbox/dark-v10" } = this.props;
    return (
      <>
        <Menu
          showMenu={this.state.showMenu}
          onClose={() => this.onClose()}
          showMap={this.state.showMap}
          onSliderChange={(e, val) => this.setState({ showMap: val })}
          onClick={(x) => this.setState({ showMap: x })}
        />
        <InfoMenu
          showMenu={this.state.showInfoMenu}
          onClose={() => this.onInfoMenuClose()}
          clickedObject={this.state.clickedObject}
        />
        <Fab
          style={{
            zIndex: 1,
            marginLeft: 20,
            marginTop: 20,
            backgroundColor: "gray",
          }}
          onClick={() => this.toggleDrawer()}
        >
          Menu
        </Fab>
        <DeckGL
          layers={this._renderLayers()}
          // effects={this._effects}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
        >
          <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
          <Legend colors={this.renderLegend()} type={this.state.showMap} />
          {this._renderTooltip}
        </DeckGL>
      </>
    );
  }
}

export function renderToDOM(container) {
  render(<App />, container);
}
