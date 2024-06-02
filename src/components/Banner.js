import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';
import logo from '../images/right.png'; 


function Banner() {
  return (
    <banner className="topbanner">
       <ul className="nav-item">
            <Link className="nav-link" to="/specials">See what's on SPECIALS this week
              <img src={logo} alt="Arrow" />
            </Link> 
        </ul>
    </banner>
  );
}

export default Banner;
