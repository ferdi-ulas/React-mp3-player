import React from "react";
import Player from "./components/Player";
import "../src/css/App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <h1 className="styled-title">MP3 Player</h1>
      <Player />
      <Footer />
    </div>
  );
}

export default App;
