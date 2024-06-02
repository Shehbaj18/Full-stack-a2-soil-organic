import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { itemImages } from './cart';
import { clearCart } from './data/repository';

function Summary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, username } = location.state || { cartItems: [], username: '' };

  useEffect(() => {
    async function clearUserCart() {
      try {
        await clearCart(username);
      } catch (error) {
        console.error("Failed to clear cart:", error);
      }
    }
    clearUserCart();
  }, [username]);

  const getImageForItem = (itemName) => {
    return itemImages[itemName] || 'path/to/default/image.jpg';
  };

  return (
    <div>
      <h2>Summary</h2>
      <p>Your purchase was successful. Thank you!</p>
      <h3>Items Purchased:</h3>
      {cartItems.length === 0 ? (
        <p>No items purchased.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => {
            if (!item.Product) {
              console.warn(`Item at index ${index} does not have a Product property`, item);
              return null;
            }
            return (
              <li key={index}>
                <img src={getImageForItem(item.Product.name)} alt={item.Product.name} style={{ width: '50px', marginRight: '10px' }} />
                {item.Product.name} - ${item.Product.isSpecial ? item.Product.specialPrice : item.Product.price} x {item.quantity}
              </li>
            );
          })}
        </ul>
      )}
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default Summary;
