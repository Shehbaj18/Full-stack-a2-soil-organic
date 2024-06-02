const express = require("express");
const cartController = require("../controllers/cart.controller"); // Ensure this path is correct
const router = express.Router();

// Route to add an item to the cart
router.post("/add", cartController.addToCart);

// Route to remove an item from the cart
router.post("/remove-item", cartController.removeFromCart);

// Route to get all items in the cart
router.get("/:username", cartController.getCartItems);

// Route to clear the cart
router.post("/clear", cartController.clearCart);

// Route for checkout
router.post("/checkout", cartController.checkout);

module.exports = router;
