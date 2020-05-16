import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BaseMap from "./components/BaseMap";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/map1">
              <BaseMap mapIndex={1} />
            </Route>
            <Route path="/map2">
              <BaseMap mapIndex={2} />
            </Route>
            <Route path="/map3">
              <BaseMap mapIndex={3} />
            </Route>
            <Route path="/map4">
              <BaseMap mapIndex={4} />
            </Route>
            <Route path="/map5">
              <BaseMap mapIndex={5} />
            </Route>
            <Route path="/map6">
              <BaseMap mapIndex={6} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export function renderToDOM(container) {
  render(<App />, container);
}
