import React from "react";
import Drawer from "./components/Dashboard/Drawer";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <Footer />
    </div>
  );
}

export default App;
