import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import { MemoryRouter } from "react-router-dom";

// Mock props to simulate a user
const mockUser = {
  username: "testuser",
  email: "testuser@example.com",
  phone: "1234567890",
  joinDate: "2023-01-01T00:00:00.000Z",
  password_hash: "hashedpassword",
};

// Mock function to simulate the loginUser function
const mockLoginUser = jest.fn();

// Render the Profile component before each test
beforeEach(() => {
  render(
    <MemoryRouter>
      <Profile user={mockUser} loginUser={mockLoginUser} />
    </MemoryRouter>
  );
});

// Test case to check if the Profile component renders correctly
test("renders profile component", () => {
  // Check if the "Username:" text is present in the document
  const usernameElement = screen.getByText(/Username:/i);
  expect(usernameElement).toBeInTheDocument();
});

// Test case to check if the user data is displayed correctly
test("displays user data", () => {
  // Check if the email, phone, and join date are displayed correctly
  const emailElement = screen.getByText(mockUser.email);
  const phoneElement = screen.getByText(mockUser.phone);
  const joinDateElement = screen.getByText(new Date(mockUser.joinDate).toLocaleString());

  expect(emailElement).toBeInTheDocument();
  expect(phoneElement).toBeInTheDocument();
  expect(joinDateElement).toBeInTheDocument();
});

// Test case to check if the component enters edit mode when the edit button is clicked
test("enters edit mode when edit button is clicked", () => {
  // Click the "Edit" button
  const editButton = screen.getByText(/Edit/i);
  fireEvent.click(editButton);

  // Check if the "Save" button is displayed
  const saveButton = screen.getByText(/Save/i);
  expect(saveButton).toBeInTheDocument();
});

// Test case to check if changes are saved and the component exits edit mode
test("saves changes and exits edit mode", () => {
  // Click the "Edit" button to enter edit mode
  const editButton = screen.getByText(/Edit/i);
  fireEvent.click(editButton);

  // Change the email input value
  const emailInput = screen.getByLabelText(/Email:/i);
  fireEvent.change(emailInput, { target: { value: "newemail@example.com" } });

  // Click the "Save" button
  const saveButton = screen.getByText(/Save/i);
  fireEvent.click(saveButton);

  // Check if the "Save" button is no longer displayed and the new email is displayed
  expect(screen.queryByText(/Save/i)).not.toBeInTheDocument();
  expect(screen.getByText("newemail@example.com")).toBeInTheDocument();
});

// Test case to check if the user is deleted when the delete button is clicked
test("deletes user when delete button is clicked", () => {
  // Mock the window.confirm method to return true
  window.confirm = jest.fn(() => true);

  // Click the "Delete" button
  const deleteButton = screen.getByText(/Delete/i);
  fireEvent.click(deleteButton);

  // Check if the loginUser function is called with null and the "Username:" text is no longer displayed
  expect(mockLoginUser).toHaveBeenCalledWith(null);
  expect(screen.queryByText(/Username:/i)).not.toBeInTheDocument();
});

// Test case to check if the user is logged out when the logout button is clicked
test("logs out user when logout button is clicked", () => {
  // Click the "Logout" button
  const logoutButton = screen.getByText(/Logout/i);
  fireEvent.click(logoutButton);

  // Check if the loginUser function is called with null and the "Username:" text is no longer displayed
  expect(mockLoginUser).toHaveBeenCalledWith(null);
  expect(screen.queryByText(/Username:/i)).not.toBeInTheDocument();
});
// user must have valid profile to access cart