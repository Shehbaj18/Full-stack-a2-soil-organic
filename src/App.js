import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import NavBar from './components/NavBar';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import Shop from './components/Shop';
import Specials from './components/specials';
import MealPlan from './components/MealPlan'; 
import Cart from './components/cart'; 
import Checkout from './components/checkout'; 
import Footer from './components/footer';
import Summary from './components/summary';
import Forum from "./components/Forum";
import { getUser, removeUser } from "./components/data/repository";

function App() { 
  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };
  const logoutUser = () => {
    removeUser();
    setUser(null);
  };
  return (
    <>
      <Router>
        {/* Render the component */}
        <Banner />
        <NavBar />
        <div className="container">
          <Routes>
          <Route path="/" element={<Home user={user}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login loginUser={loginUser} />} />
            <Route path="/register" element={<Register loginUser={loginUser} />} />
            <Route path="/profile" element={<Profile user={user} loginUser={loginUser}/>} />
            <Route path="/forum" element={<Forum user={user} />} />
            <Route path="/shop" element={<Shop username={user.username}/>} />
            <Route path="/cart" element={<Cart username={user ? user.username : ''} />} /> // Pass username prop
            <Route path="/specials" element={<Specials user={user} />} />
            <Route path="/mealplan" element={<MealPlan />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
