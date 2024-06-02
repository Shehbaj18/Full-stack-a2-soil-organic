import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';

function Shop(props) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  //const userId = props.user ? props.user.user_id : null;

  useEffect(() => {
    if (props.username === null) {
      navigate('/login');
    }
  }, [props.username, navigate]);

  return (
    <div>
      <ShoppingCart userName={props.username} />
    </div>
  );
}

export default Shop;
