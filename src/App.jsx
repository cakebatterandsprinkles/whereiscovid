import React from "react";
import "./App.css";
import WorldStatus from "./components/status/worldStatus/worldStatus";
import UsStatus from "./components/usStatus/usStatus";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/protection" component={WorldStatus} />
          <Route path="/articles" component={WorldStatus} />
          <Route path="/us-status" component={UsStatus} />
          <Route path="/" component={WorldStatus} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
