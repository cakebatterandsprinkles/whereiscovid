import React from "react";
import "./App.css";
import Status from "./components/status/status";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Status />
    </div>
  );
}

export default App;
