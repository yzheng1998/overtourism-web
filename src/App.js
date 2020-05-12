import React, { Component } from "react";
import { render } from "react-dom";
import { StylesProvider } from "@material-ui/core/styles";
import BaseMap from "./components/BaseMap";

export default class App extends Component {
  render() {
    return (
      <StylesProvider theme={{}}>
        <BaseMap />
      </StylesProvider>
    );
  }
}

export function renderToDOM(container) {
  render(<App />, container);
}
