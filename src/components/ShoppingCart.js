import React, { useState, useEffect } from 'react';
import { Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ShoppingCart.css';
import { fetchProducts, getCart, addToCart } from './data/repository';

// Image URLs
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

function ShoppingCart({ userName }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    async function loadCart() {
      try {
        const cartData = await getCart(userName);
        setCartItems(cartData);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    }

    if (userName) {
      Promise.all([loadProducts(), loadCart()]).then(() => setLoading(false));
    } else {
      loadProducts().then(() => setLoading(false));
    }
  }, [userName]);

  const addItemToCart = async (productId) => {
    const quantityToAdd = parseInt(quantity[productId] || 1);

    console.log('Adding to cart:', { username: userName, productId, quantityToAdd });
    try {
      await addToCart(userName,productId, quantityToAdd);
      const updatedCart = await getCart(userName);
      setCartItems(updatedCart);
      setQuantity({ ...quantity, [productId]: '' });
      setSuccessMessage(`Added ${quantityToAdd} item(s) to cart`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Failed to add item to cart:", error.response?.data || error);
      setErrorMessage(quantityToAdd);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const getImage = (productName) => {
    return itemImages[productName] || 'path/to/default/image.jpg';
  };

  const handleCheckCart = () => {
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="shopping-cart-container">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="shopping-cart-container">
      <h1>Shop All</h1>
      <p>Our selection of organic groceries proudly champions local farmers and producers throughout Melbourne and Victoria. Whether you opt for a single purchase or regular delivery, enjoy complimentary shipping when you order alongside one of our organic groceries.</p>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <div className="cart-items">
        {products.map((product) => (
          <div className="cart-item" key={product.product_id}>
            <img src={getImage(product.name)} alt={product.name} />
            <div className="item-details">
              <h4>{product.name}</h4>
              <p>Price: ${product.isSpecial ? product.specialPrice : product.price}</p>
              <div className="item-options">
                <input
                  type="number"
                  min="1"
                  value={quantity[product.product_id] || ''}
                  onChange={(e) => setQuantity({ ...quantity, [product.product_id]: e.target.value })}
                />
                <Button variant="primary" onClick={() => addItemToCart(product.product_id)}>
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button variant="secondary" onClick={handleCheckCart}>Check Cart</Button>
    </div>
  );
}

export default ShoppingCart;