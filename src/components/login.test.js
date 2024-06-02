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

  beforeEach(() => {
    loginUser = jest.fn();
    render(
      <Router>
        <Login loginUser={loginUser} />
      </Router>
    );
  });

  test("renders login form", () => {
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("displays error message on invalid login", async () => {
    verifyUser.mockResolvedValueOnce(null);
    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "invaliduser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "invalidpassword" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Username and/or password invalid, please try again.")).toBeInTheDocument();
    });
  });

  test("navigates to home on successful login", async () => {
    const user = { id: 1, username: "testuser" };
    verifyUser.mockResolvedValueOnce(user);
    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith(user);
    });
  });

  test("displays error message on login error", async () => {
    verifyUser.mockRejectedValueOnce(new Error("Login error"));
    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("An error occurred during login. Please try again later.")).toBeInTheDocument();
    });
  });
});