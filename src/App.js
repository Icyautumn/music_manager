import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={[<Navbar />, <Home />, ]} />
          <Route path="/reports" element={[<Navbar />,<Reports />, ]} />
          <Route path="/products" element={[<Navbar />, <Products />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
