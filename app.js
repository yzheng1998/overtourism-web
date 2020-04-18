import React, { Component } from "react";
import { render } from "react-dom";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer, PolygonLayer } from "@deck.gl/layers";
import {
  LightingEffect,
  AmbientLight,
  _SunLight as SunLight,
} from "@deck.gl/core";
import * as d3 from "d3";

import { abnb20 } from "./src/geojson/abnb20.geojson";
import { ab_change } from "./src/geojson/19_17_ab_diff.geojson";
import { abnb_bnb_diff } from "./src/geojson/abnb_bnb_diff.geojson";
import { hexagon } from "./src/geojson/hexagon.geojson";
import InfoMenu from "./src/components/InfoMenu";

import { Fab } from "@material-ui/core";
import Menu from "./src/components/menu";

const hexRgb = require("hex-rgb");

// Set your mapbox token here
const MAPBOX_TOKEN =
  "pk.eyJ1IjoieXpoZW5nMTk5OCIsImEiOiJjazhqM2d2c3EwMzdlM2dwanc0Nnc1bW5wIn0.zee4RAVq4YvHdnWIKGSZ-w"; // eslint-disable-line

// Source data GeoJSON

export const COLOR_SCALE = d3
  .scaleThreshold()
  .domain([0, 10.71, 51.89, 108.04, 213.52, 40322.58])
  .range(
    d3.schemeReds[6]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

export const COLOR_SCALE_change = d3
  .scaleThreshold()
  .domain([-100, -30, 0, 40.74, 266.67, 883.33, 1500])
  .range(
    d3.schemeSpectral[7]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

export const COLOR_SCALE_UOH = d3
  .scaleThreshold()
  .domain([0, 9, 26, 51, 109, 214])
  .range(
    d3.schemeGreens[6]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

export const COLOR_SCALE_change_UOH = d3
  .scaleThreshold()
  .domain([-100, 0, 114.29, 425, 1100, 2300, 4700])
  .range(
    d3.schemeSpectral[7]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

export const COLOR_SCALE_AB20 = d3
  .scaleThreshold()
  .domain([0, 7.321, 19.802, 35.088, 61.224, 128.205])
  .range(
    d3.schemePurples[6]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

export const COLOR_SCALE_change_AB = d3
  .scaleThreshold()
  .domain([-100, -40, 0, 41.67, 140, 316.67, 700])
  .range(
    d3.schemeSpectral[7]
      .map((f) => hexRgb(f, { format: "array" }))
      .map((f) => f.slice(0, 3))
  );

export const COLOR_SCALE_AB_BNB = d3
  .scaleThreshold()
  .domain([0, 62.5, 200, 500, 1000, 2500])
  .range(
    d3.schemePurples[6]
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

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const dirLight = new SunLight({
  timestamp: Date.UTC(2019, 7, 1, 22),
  color: [255, 255, 255],
  intensity: 1.0,
  _shadow: false,
});

// const landCover = [
//   [
//     [-123.0, 49.196],
//     [-123.0, 49.324],
//     [-123.306, 49.324],
//     [-123.306, 49.196]
//   ]
// ];

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

    const lightingEffect = new LightingEffect({ ambientLight, dirLight });
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    this._effects = [lightingEffect];
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
    // console.log(
    //   d3.schemeReds[6]
    //     .map(f => hexRgb(f, { format: "array" }))
    //     .map(f => f.slice(0, 3))
    // );

    let layers = [];

    // only needed when using shadows - a plane for shadows to drop on
    // layers.push(
    //   new PolygonLayer({
    //     id: "ground",
    //     data: landCover,
    //     stroked: false,
    //     getPolygon: f => f,
    //     getFillColor: [0, 0, 0, 0]
    //   })
    // );

    if (this.state.showMap === 0) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => COLOR_SCALE(f.properties["91_clip_pop"]),
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["91_clip_pop"],
          },
        })
      );
    }

    if (this.state.showMap === 1) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => COLOR_SCALE(f.properties["01_clip_pop"]),
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["01_clip_pop"],
          },
        })
      );
    }

    if (this.state.showMap === 2) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => COLOR_SCALE(f.properties["11_clip_pop"]),
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["11_clip_pop"],
          },
        })
      );
    }

    if (this.state.showMap === 3) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) =>
            COLOR_SCALE_change(
              f.properties["11_clip_pop"] - f.properties["91_clip_pop"]
            ),
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["91_clip_pop", "11_clip_pop"],
          },
        })
      );
    }

    if (this.state.showMap === 4) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => COLOR_SCALE_UOH(f.properties["91_clip_uoh"]),
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["91_clip_uoh"],
          },
        })
      );
    }

    if (this.state.showMap === 5) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => COLOR_SCALE_UOH(f.properties["01_clip_uoh"]),
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["01_clip_uoh"],
          },
        })
      );
    }

    if (this.state.showMap === 6) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => COLOR_SCALE_UOH(f.properties["11_clip_uoh"]),
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["11_clip_uoh"],
          },
        })
      );
    }

    if (this.state.showMap === 7) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: hexagon,
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) =>
            COLOR_SCALE_change_UOH(
              f.properties["11_clip_uoh"] - f.properties["91_clip_uoh"]
            ),
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
          updateTriggers: {
            getFillColor: ["91_clip_uoh", "11_clip_uoh"],
          },
        })
      );
    }

    if (this.state.showMap === 8) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: abnb20,
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => COLOR_SCALE_AB20(f.properties.ab_hec),
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
        })
      );
    }

    if (this.state.showMap === 9) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: ab_change,
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => COLOR_SCALE_change_AB(f.properties.ab_diff),
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
        })
      );
    }

    if (this.state.showMap === 10) {
      layers.push(
        new GeoJsonLayer({
          id: "geojson",
          data: abnb_bnb_diff,
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 0,
          getLineColor: [255, 255, 255],
          getFillColor: (f) => COLOR_SCALE_AB_BNB(f.properties.mismatch),
          pickable: true,
          onHover: this._onHover,
          onClick: this._onClick,
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
              <div>{hoveredObject.properties["91_clip_pop"]} people</div>
            </>
          )}
          {this.state.showMap === 1 && (
            <>
              <b>Population</b>
              <div>{hoveredObject.properties["01_clip_pop"]} people</div>
            </>
          )}
          {this.state.showMap === 2 && (
            <>
              <b>Population </b>
              <div>{hoveredObject.properties["11_clip_pop"]} people</div>
            </>
          )}
          {this.state.showMap === 3 && (
            <>
              <b>Population Difference</b>
              <div>
                {hoveredObject.properties["11_clip_pop"] -
                  hoveredObject.properties["91_clip_pop"]}{" "}
                people
              </div>
            </>
          )}
          {this.state.showMap === 4 && (
            <>
              <b>Unoccupied Housing</b>
              <div>{hoveredObject.properties["91_clip_uoh"]} dwellings</div>
            </>
          )}
          {this.state.showMap === 5 && (
            <>
              <b>Unoccupied Housing</b>
              <div>{hoveredObject.properties["01_clip_uoh"]} dwellings</div>
            </>
          )}
          {this.state.showMap === 6 && (
            <>
              <b>Unoccupied Housing</b>
              <div>{hoveredObject.properties["11_clip_uoh"]} dwellings</div>
            </>
          )}
          {this.state.showMap === 7 && (
            <>
              <b>Unoccupied Housing Difference</b>
              <div>
                {hoveredObject.properties["11_clip_uoh"] -
                  hoveredObject.properties["91_clip_uoh"]}{" "}
                dwellings
              </div>
            </>
          )}
          {this.state.showMap === 8 && (
            <>
              <b>Airbnb Density (2020)</b>
              <div>{hoveredObject.properties.ab_hec} Airbnbs per hectare</div>
            </>
          )}
          {this.state.showMap === 9 && (
            <>
              <b>Airbnb Change (Summer 2017-2019)</b>
              <div>{hoveredObject.properties.ab_diff}%</div>
            </>
          )}
          {this.state.showMap === 10 && (
            <>
              <b>Airbnb Municipality Mismatch</b>
              <div>{hoveredObject.properties.mismatch}%</div>
            </>
          )}
        </div>
      )
    );
  }

  render() {
    const { mapStyle = "mapbox://styles/mapbox/light-v9" } = this.props;
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
          //   effects={this._effects}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
        >
          <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />

          {this._renderTooltip}
        </DeckGL>
      </>
    );
  }
}

export function renderToDOM(container) {
  render(<App />, container);
}
