import React, { Component } from "react";
import { render } from "react-dom";
import BaseMap from "./components/BaseMap";

export default class App extends Component {
  render() {
    return <BaseMap />;
  }
}

export function renderToDOM(container) {
  render(<App />, container);
}
