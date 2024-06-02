import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { addToCart, getCart, fetchProducts } from './data/repository';
import './specials.css';
import { useNavigate } from 'react-router-dom';

function Specials({ user }) {
  const [specials, setSpecials] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    async function loadSpecials() {
      try {
        const data = await fetchProducts();
        const specialProducts = data.filter(product => product.isSpecial);
        setSpecials(specialProducts);
      } catch (error) {
        console.error("Failed to fetch specials:", error);
      }
    }

    async function loadCart() {
      try {
        const cartData = await getCart(user.username);
        setCartItems(cartData);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    }

    loadSpecials();
    if (user && user.username) {
      loadCart();
    }
  }, [user]);

  const handleAddToCart = async (productId) => {
    const quantityToAdd = parseInt(quantity[productId] || 1);
    console.log('Adding to cart:', { username: user.username, productId, quantityToAdd });
    try {
      await addToCart(user.username, productId, quantityToAdd);
      const updatedCart = await getCart(user.username);
      setCartItems(updatedCart);
      alert('Item added to cart!');
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  return (
    <div className="specials-container">
      <h1>Specials for the Week</h1>
      <p>Discounts on special products. Save More!</p>
      <div className="specials-items">
        {specials.map((special, index) => (
          <div className="specials-item" key={index}>
            <img src={special.image} alt={special.name} />
            <div className="item-details">
              <h4>{special.name}</h4>
              <p>Price: ${special.specialPrice}</p>
              <div className="item-options">
                <input
                  type="number"
                  min="1"
                  value={quantity[special.product_id] || ''}
                  onChange={(e) => setQuantity({ ...quantity, [special.product_id]: e.target.value })}
                />
                <Button variant="primary" onClick={() => handleAddToCart(special.product_id)}>
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Specials;
