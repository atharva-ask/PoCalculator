import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Category from "./Category";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import "./App.css";

// Homepage component
function Home() {
  return (
    <div>
      <h1>Dashboard of PO Generator</h1>
      <nav>
        <ul>
          <li>
            <Link to="/first">Update the Po's</Link>
          </li>
          <li>
            <Link to="/second">Update Attainments</Link>
          </li>
          <li>
            <Link to="/third">Generate Report </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/first" element={<Category />} />
        <Route exact path="/second" element={<SecondPage />} />
        <Route exact path="/third" element={<ThirdPage />} />
      </Routes>
    </Router>
  );
}

export default App;
