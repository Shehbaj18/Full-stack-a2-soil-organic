import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import { getCart, addToCart, removeFromCart, clearCart } from './data/repository';

const itemImages = {
  Apples: 'https://images.unsplash.com/photo-1611574474484-ced6cb70a2cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Avocado: 'https://images.unsplash.com/photo-1612506266679-606568a33215?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Blueberries: 'https://images.unsplash.com/photo-1597774681009-f8679cf72348?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Capsicum: 'https://images.unsplash.com/photo-1585159079680-8dec029b76ed?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Eggplant: 'https://images.unsplash.com/photo-1605197378540-10ebaf6999e5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Eggs6: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Eggs12: 'https://images.unsplash.com/photo-1660224286794-fc173fa9295c?q=80&w=1004&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Full_Cream_Milk: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Lettuce: 'https://images.unsplash.com/photo-1591193144634-a2bf060fdb36?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Low_Fat_Milk: 'https://plus.unsplash.com/premium_photo-1695042864784-8e3c7b52aeb3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Oat_Milk: 'https://plus.unsplash.com/premium_photo-1664647903517-70bb8213c743?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Onions: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Potatoes: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Raspberries: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  RedBell: 'https://images.unsplash.com/photo-1513530774447-73de85f43d60?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Strawberries: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=460&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Tomatoes: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Beef: 'https://images.unsplash.com/photo-1613454320437-0c228c8b1723?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Chicken: 'https://images.unsplash.com/photo-1615205349253-9694e5d9654b?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  BlackTea: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=867&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  DecafCoffee: 'https://images.unsplash.com/photo-1501492673258-2bcfc17241fd?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  GreenTea: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Lamb: 'https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
};

function Cart({ username }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    async function loadCart() {
      try {
        setCartData(await getCart(username));
        console.log('Fetched cart data:', cartData);
        setCartItems(cartData);
        const initialQuantities = {};
        cartData.forEach(item => {
         // console.log('Fetched cart data:', item.product);

          if (item.Product) {
            initialQuantities[item.Product.product_id] = item.quantity;
          }
        });

        setQuantities(initialQuantities);
      } catch (error) {
        console.error(error.message);
      }
    }

    loadCart();
  }, [username]);

  const getImageForItem = (itemName) => {
    return itemImages[itemName] || 'path/to/default/image.jpg';
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems, username } });
  };

  const updateCartState = async () => {
    const updatedCart = await getCart(username);
    setCartItems(updatedCart);
    const updatedQuantities = {};
    updatedCart.forEach(item => {
      if (item.Product) {
        updatedQuantities[item.Product.product_id] = item.quantity;
      }
    });
    setQuantities(updatedQuantities);
  };

  const handleAddItem = async (productId, quantity) => {
    try {
      await addToCart(username, productId, quantity);
      await updateCartState();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleRemoveItem = async (productId, quantity) => {
    try {
      await removeFromCart(username, productId, quantity);
      await updateCartState();
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const handleEmptyCart = async () => {
    try {
      await clearCart(username);
      setCartItems([]);
      setQuantities({});
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      if (item.Product) {
        totalPrice += item.Product.isSpecial ? item.Product.specialPrice * item.quantity : item.Product.price * item.quantity;
      }
    });
    return totalPrice.toFixed(2);
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities({
      ...quantities,
      [productId]: parseInt(quantity)
    });
  };

  const boolCheck = () => {
    if(cartData !== null){
      return true;
    }
    return false;
  }

  return (
    <div className="final-cart-container">
      <h2>Cart</h2>
      {cartData !== null ? (
        <div>
          <ul className="final-cart-items-list">
            {cartItems.map((item, index) => (
              <li key={index} className="final-cart-item">
                {boolCheck() ? (
                  <>
                    <img src={getImageForItem(item.Product.name)} alt={item.Product.name} />
                    <div className="final-item-details">
                      <div><strong>{item.Product.name}</strong> - ${item.Product.isSpecial ? item.Product.specialPrice : item.Product.price} each</div>
                      <div>Quantity: {item.quantity}</div>
                      <div className="final-item-actions">
                        <input
                          type="number"
                          min="1"
                          value={quantities[item.Product.product_id] || ''}
                          onChange={(e) => handleQuantityChange(item.Product.product_id, e.target.value)}
                        />
                        <button onClick={() => handleAddItem(item.Product.product_id, parseInt(quantities[item.Product.product_id] || 1))}>+</button>
                        <button onClick={() => handleRemoveItem(item.Product.product_id, parseInt(quantities[item.Product.product_id] || 1))}>-</button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>Product details not available</div>
                )}
              </li>
            ))}
          </ul>
          <p className="total-price">Total: ${calculateTotalPrice()}</p>
          <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
          <button className="empty-cart-button" onClick={handleEmptyCart}>Empty Cart</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
export { itemImages };