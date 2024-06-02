import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import { verifyUser } from "./data/repository";

// Mock the verifyUser function
jest.mock("./data/repository", () => ({
  verifyUser: jest.fn(),
}));

describe("Login Component", () => {
  let loginUser;

  // This runs before each individual test
  beforeEach(() => {
    // Mock function for loginUser
    loginUser = jest.fn();
    // Render the Login component wrapped in Router for routing context
    render(
      <Router>
        <Login loginUser={loginUser} />
      </Router>
    );
  });

  // Test case to check if the login form renders correctly
  test("renders login form", () => {
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  // Test case to check if an error message is displayed on invalid login
  test("displays error message on invalid login", async () => {
    // Mock verifyUser to return null for invalid credentials
    verifyUser.mockResolvedValueOnce(null);

    // Simulate user entering invalid credentials
    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "invaliduser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "invalidpassword" },
    });

    // Simulate clicking the login button
    fireEvent.click(screen.getByText("Login"));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText("Username and/or password invalid, please try again.")).toBeInTheDocument();
    });
  });

  // Test case to check if navigation to home occurs on successful login
  test("navigates to home on successful login", async () => {
    // Mock verifyUser to return a valid user object
    const user = { id: 1, username: "testuser" };
    verifyUser.mockResolvedValueOnce(user);

    // Simulate user entering valid credentials
    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "password" },
    });

    // Simulate clicking the login button
    fireEvent.click(screen.getByText("Login"));

    // Wait for the loginUser function to be called with the user object
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith(user);
    });
  });

  // Test case to check if an error message is displayed on login error
  test("displays error message on login error", async () => {
    // Mock verifyUser to throw an error
    verifyUser.mockRejectedValueOnce(new Error("Login error"));

    // Simulate user entering credentials
    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "password" },
    });

    // Simulate clicking the login button
    fireEvent.click(screen.getByText("Login"));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText("An error occurred during login. Please try again later.")).toBeInTheDocument();
    });
  });
});
// only logged in user can access cart 