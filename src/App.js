import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Publications from "./components/Publications";
import Achievements from "./components/Achievements";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <About />
        <Publications />
        <Projects />
        <Experience />
        <Achievements />
      </main>
    </div>
  );
}

export default App;
