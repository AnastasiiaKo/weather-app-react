import React from "react";
import Weather from "./Weather";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Weather defaultCity="London" />
      </header>
          <div className="signature">
      <a
        href="https://github.com/AnastasiiaKo/weather-react"
        className="link"
        target="_blank"
        rel="noreferrer"
      >
        Open-source code on GitHub
      </a>
      {" "}by Anastasiia Kosinova
  </div>
    </div>

  );
}

export default App;
