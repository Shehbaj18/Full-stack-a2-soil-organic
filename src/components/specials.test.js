import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Specials from "./specials";
import { fetchProducts, getCart, addToCart } from "./data/repository";

// Mock the functions from the repository
jest.mock("./data/repository");

describe("Specials Component", () => {
  const user = { username: "testuser" };
  let specials;
  let cartItems;

  beforeAll(() => {
    specials = [
      { product_id: 1, name: "Apple", specialPrice: 1.99, isSpecial: true, image: "apple.jpg" },
      { product_id: 2, name: "Banana", specialPrice: 0.99, isSpecial: true, image: "banana.jpg" }
    ];

    cartItems = [
      { product_id: 1, name: "Apple", quantity: 2, specialPrice: 1.99 }
    ];

    fetchProducts.mockResolvedValue(specials);
    getCart.mockResolvedValue(cartItems);
    addToCart.mockResolvedValue(true);
  });

  beforeEach(() => {
    render(<Specials user={user} />);
  });

  test("Renders specials component", () => {
    expect(screen.getByText("Specials for the Week")).toBeInTheDocument();
  });

  test("Displays all specials", async () => {
    await waitFor(() => {
      specials.forEach(special => {
        expect(screen.getByText(special.name)).toBeInTheDocument();
        expect(screen.getByText(`Price: $${specials.specialPrice}`)).toBeInTheDocument();      });
    });
  });

  test("Handles add to cart", async () => {
    await waitFor(() => screen.getByText("Apple"));

    const addButton = screen.getAllByText("Add")[0];
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(addToCart).toHaveBeenCalledWith(user.username, 1, 1);
      expect(screen.getByText("Item added to cart!")).toBeInTheDocument();
    });
  });

  test("Updates quantity input", async () => {
    await waitFor(() => screen.getByText("Apple"));

    const quantityInput = screen.getAllByRole("spinbutton")[0];
    fireEvent.change(quantityInput, { target: { value: "3" } });

    expect(quantityInput.value).toBe("3");
  });
});