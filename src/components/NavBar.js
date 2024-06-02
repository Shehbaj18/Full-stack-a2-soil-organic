import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import user from '../images/user.png'; 
import cart from '../images/cart.png'; 

const NavBar = () => {
    return (
        // navbar features
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">SOIL Organics</Link> 
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ flexDirection: 'row' }}> 
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link className="nav-link" to="/shop">Shop All</Link> 
                        </li><li className="nav-item">
                            <Link className="nav-link" to="/specials">Specials</Link> 
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mealplan">Meal Plan</Link> 
                        </li>
                    </ul>
                    <form className="d-flex"> 
                        <Link className="btn btn-primary mx-1" to="/Profile" role="button">
                        <img src={user} alt="User" />
                        </Link>
                        <Link className="btn btn-primary mx-1" to="/cart" role="button">
                        <img src={cart} alt="cart" />
                        </Link>
                        <Link className="btn btn-primary mx-2" to="/Login" role="button">Login</Link>
                    </form>
                </div>
            </div>
        </nav>
    );
}
                
export default NavBar;
