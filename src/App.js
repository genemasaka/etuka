import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import NavBar  from './NavBar.js';
import Home from './Home.js';
import CreateSite from './CreateSite.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {

  return (
    <Router>
    <div >
    <NavBar />
    </div>
    
    <div>
    <Routes>

    <Route exact path="/" element={<Home />} />

    
    <Route path="/create" element={<CreateSite />} />
    </Routes>
    </div>
  
    </Router>
 );
  
}

export default App;
