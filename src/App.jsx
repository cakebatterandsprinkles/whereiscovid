import React from "react";
import "./App.css";
import Status from "./components/status/status";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" component={Status} />
          <Route path="/protection" component={Status} />
          <Route path="/articles" component={Status} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
