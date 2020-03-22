import React from "react";
import "./App.css";
import Status from "./components/status/status";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/protection" component={Status} />
          <Route path="/articles" component={Status} />
          <Route path="/" component={Status} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
