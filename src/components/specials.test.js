import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Specials from "./specials";
import { fetchProducts, getCart, addToCart } from "./data/repository";

// Mock the functions from the repository to control their behavior during tests
jest.mock("./data/repository");

describe("Specials Component", () => {
  // Define a mock user and some mock data for specials and cart items
  const user = { username: "testuser" };
  let specials;
  let cartItems;

  // This runs once before all tests
  beforeAll(() => {
    // Mock data representing special products
    specials = [
      { product_id: 1, name: "Apple", specialPrice: 1.99, isSpecial: true, image: "apple.jpg" },
      { product_id: 2, name: "Banana", specialPrice: 0.99, isSpecial: true, image: "banana.jpg" }
    ];

    // Mock data representing items already in the cart
    cartItems = [
      { product_id: 1, name: "Apple", quantity: 2, specialPrice: 1.99 }
    ];

    // Mock the implementation of fetchProducts to return the specials data
    fetchProducts.mockResolvedValue(specials);
    // Mock the implementation of getCart to return the cart items data
    getCart.mockResolvedValue(cartItems);
    // Mock the implementation of addToCart to return a successful operation
    addToCart.mockResolvedValue(true);
  });

  // This runs before each individual test
  beforeEach(() => {
    // Render the Specials component with the mock user as a prop
    render(<Specials user={user} />);
  });

  // Test case to check if the Specials component renders correctly
  test("Renders specials component", () => {
    expect(screen.getByText("Specials for the Week")).toBeInTheDocument();
  });

  // Test case to check if all special products are displayed correctly
  test("Displays all specials", async () => {
    await waitFor(() => {
      specials.forEach(special => {
        expect(screen.getByText(special.name)).toBeInTheDocument();
        expect(screen.getByText(`Price: $${special.specialPrice}`)).toBeInTheDocument();
      });
    });
  });

  // Test case to check if the add to cart functionality works correctly
  test("Handles add to cart", async () => {
    // Wait for the special product "Apple" to be displayed
    await waitFor(() => screen.getByText("Apple"));

    // Find the first "Add" button and click it
    const addButton = screen.getAllByText("Add")[0];
    fireEvent.click(addButton);

    // Wait for the addToCart function to be called and check if the success message is displayed
    await waitFor(() => {
      expect(addToCart).toHaveBeenCalledWith(user.username, 1, 1);
      expect(screen.getByText("Item added to cart!")).toBeInTheDocument();
    });
  });

  // Test case to check if the quantity input updates correctly
  test("Updates quantity input", async () => {
    // Wait for the special product "Apple" to be displayed
    await waitFor(() => screen.getByText("Apple"));

    // Find the quantity input (spinbutton) and change its value to "3"
    const quantityInput = screen.getAllByRole("spinbutton")[0];
    fireEvent.change(quantityInput, { target: { value: "3" } });

    // Check if the quantity input value is updated correctly
    expect(quantityInput.value).toBe("3");
  });
});
// special is linked to cart 
