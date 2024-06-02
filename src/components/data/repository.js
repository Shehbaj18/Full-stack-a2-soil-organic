import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(`${API_HOST}/api/users/login`, { params: { username, password } });
  const user = response.data;
  
  if(user !== null)
    setUser(user);

  return user;
}


async function findUser(name) {
  const response = await axios.get(`${API_HOST}/api/users/select/${name}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(`${API_HOST}/api/users`, user);

  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  try {
    const response = await axios.get(`${API_HOST}/api/posts`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
}

async function createPost(post) {
  try {
    const response = await axios.post(`${API_HOST}/api/posts`, post);
    return response.data;
  } catch (error) {
    console.error('Failed to create post:', error);
    throw error;
  }
}

// --- Product ------------------------------------------------------------------------------------
async function fetchProducts() {
  const response = await axios.get(`${API_HOST}/api/products`);
  return response.data;
}

// --- Cart ---------------------------------------------------------------------------------------
async function getCart(username) {
  const response = await axios.get(`${API_HOST}/api/cart/${username}`);
  return response.data;
}

export const addToCart = async (username, productId, quantity) => {
  try {
    const response = await axios.post('/api/cart/add', {
      username,
      product_id: productId,
      quantity
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

async function removeFromCart(username, productId, quantity) {
  const response = await axios.post(`${API_HOST}/api/cart/remove-item`, { username, productId, quantity });
  return response.data;
}

async function clearCart(username) {
  try {
    const response = await axios.post(`${API_HOST}/api/cart/clear`, { username });
    return response.data;
  } catch (error) {
    console.error('Failed to clear cart:', error);
    throw error;
  }
}


// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, findUser, createUser,
  getPosts, createPost,
  getUser, removeUser,
  fetchProducts, getCart, addToCart, removeFromCart, clearCart
};
