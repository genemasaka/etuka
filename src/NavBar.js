import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
      <Link className="navbar-brand" style={{'margin-left': '30px',}} to="/">etuka</Link>
      
      <ul class="navbar-nav">
      <li class="nav-item">
        <Link class="nav-link" to="/create" >create</Link>
      </li>
      </ul>
      
      </nav>
  );
}

export default NavBar;