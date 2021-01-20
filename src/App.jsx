import { createBrowserHistory } from "history";
import React from "react";
import ReactGA from "react-ga";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Articles from "./components/articles/articles";
import Footer from "./components/footer/footer";
import Landing from "./components/landing/landing";
import Navbar from "./components/navbar/navbar";
import WorldStatus from "./components/status/worldStatus/worldStatus";
import UsStatus from "./components/usStatus/usStatus";

const history = createBrowserHistory();

history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

function App() {
  ReactGA.initialize("UA-161621107-1");
  ReactGA.pageview(window.location.pathname);
  return (
    <BrowserRouter history={history}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route component={Articles} path="/articles" />
          <Route component={UsStatus} path="/us-status" />
          <Route component={WorldStatus} path="/world-status" />
          <Route component={Landing} path="/" />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
