import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import BaseMap from "./components/BaseMap";

export default function App() {
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/map1">Map 1</Link>
        </li>
        <li>
          <Link to="/map2">Map 2</Link>
        </li>
        <li>
          <Link to="/map3">Map 3</Link>
        </li>
        <li>
          <Link to="/map4">Map 4</Link>
        </li>
        <li>
          <Link to="/map5">Map 5</Link>
        </li>
        <li>
          <Link to="/map6">Map 6</Link>
        </li>
      </ul>
    </nav>
  );
}
