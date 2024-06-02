const db = require("../database");

exports.addToCart = async (req, res) => {
  try {
    const { username, productId, quantity } = req.body;
    console.log('Received add to cart request:', { username, productId, quantity });

    if (!username || !productId || !quantity) {
      return res.status(400).send({ message: "Username, Product ID, and Quantity are required" });
    }

    let cart = await db.cart.findOne({ where: { username } });
    if (!cart) {
      cart = await db.cart.create({ username });
    }

    let cartItem = await db.cartItem.findOne({ where: { cart_id: cart.cart_id, product_id: productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await db.cartItem.create({
        cart_id: cart.cart_id,
        product_id: productId,
        quantity
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).send({ message: "Error adding item to cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { username, productId } = req.body;
    console.log('Received remove from cart request:', { username, productId });

    if (!username || !productId) {
      return res.status(400).send({ message: "Username and Product ID are required" });
    }

    const cart = await db.cart.findOne({ where: { username } });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    const cartItem = await db.cartItem.findOne({ where: { cart_id: cart.cart_id, product_id: productId } });
    if (!cartItem) {
      return res.status(404).send({ message: "Item not found in cart" });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
    } else {
      await cartItem.destroy();
    }

    res.status(200).send({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).send({ message: "Error removing item from cart" });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const { username } = req.params;
    console.log('Received get cart items request:', { username });

    if (!username) {
      return res.status(400).send({ message: "Username is required" });
    }

    const cart = await db.cart.findOne({ where: { username } });
    console.log('Fetched cart data:', cart);

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    

    const items = await db.cartItem.findAll({
      where: { cart_id: cart.cart_id },
      include: [{ model: db.product }]
    });
    if (!items) {
      return res.status(405).send({ message: "Cart not found" });
    }

    res.status(200).json(items);
  } catch (error) {
    console.error("Error getting cart items:", error);
    res.status(500).send({ message: "Error getting cart items" });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { username } = req.body;
    console.log('Received clear cart request:', { username });

    if (!username) {
      return res.status(400).send({ message: "Username is required" });
    }

    const cart = await db.cart.findOne({ where: { username } });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    await db.cartItem.destroy({ where: { cart_id: cart.cart_id } });
    res.status(200).send({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).send({ message: "Error clearing cart" });
  }
};

exports.checkout = async (req, res) => {
  try {
    const { username } = req.body;
    console.log('Received checkout request:', { username });

    if (!username) {
      return res.status(400).send({ message: "Username is required" });
    }

    const cart = await db.cart.findOne({ where: { username } });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    const items = await db.cartItem.findAll({ where: { cart_id: cart.cart_id } });
    if (items.length === 0) {
      return res.status(400).send({ message: "Cart is empty" });
    }

    const order = await db.order.create({ username, total: calculateTotal(items) });
    for (let item of items) {
      await db.orderItem.create({
        order_id: order.order_id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      });
    }

    await db.cartItem.destroy({ where: { cart_id: cart.cart_id } });

    res.status(200).send({ message: "Checkout successful", order });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).send({ message: "Error during checkout" });
  }
};

function calculateTotal(items) {
  return items.reduce((total, item) => total + item.quantity * item.Product.price, 0);
}
