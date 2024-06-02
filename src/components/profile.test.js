import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import { MemoryRouter } from "react-router-dom";

// Mock props
const mockUser = {
  username: "testuser",
  email: "testuser@example.com",
  phone: "1234567890",
  joinDate: "2023-01-01T00:00:00.000Z",
  password_hash: "hashedpassword",
};

const mockLoginUser = jest.fn();

beforeEach(() => {
  render(
    <MemoryRouter>
      <Profile user={mockUser} loginUser={mockLoginUser} />
    </MemoryRouter>
  );
});

test("renders profile component", () => {
  const usernameElement = screen.getByText(/Username:/i);
  expect(usernameElement).toBeInTheDocument();
});

test("displays user data", () => {
  const emailElement = screen.getByText(mockUser.email);
  const phoneElement = screen.getByText(mockUser.phone);
  const joinDateElement = screen.getByText(new Date(mockUser.joinDate).toLocaleString());

  expect(emailElement).toBeInTheDocument();
  expect(phoneElement).toBeInTheDocument();
  expect(joinDateElement).toBeInTheDocument();
});

test("enters edit mode when edit button is clicked", () => {
  const editButton = screen.getByText(/Edit/i);
  fireEvent.click(editButton);

  const saveButton = screen.getByText(/Save/i);
  expect(saveButton).toBeInTheDocument();
});

test("saves changes and exits edit mode", () => {
  const editButton = screen.getByText(/Edit/i);
  fireEvent.click(editButton);

  const emailInput = screen.getByLabelText(/Email:/i);
  fireEvent.change(emailInput, { target: { value: "newemail@example.com" } });

  const saveButton = screen.getByText(/Save/i);
  fireEvent.click(saveButton);

  expect(screen.queryByText(/Save/i)).not.toBeInTheDocument();
  expect(screen.getByText("newemail@example.com")).toBeInTheDocument();
});

test("deletes user when delete button is clicked", () => {
  window.confirm = jest.fn(() => true);

  const deleteButton = screen.getByText(/Delete/i);
  fireEvent.click(deleteButton);

  expect(mockLoginUser).toHaveBeenCalledWith(null);
  expect(screen.queryByText(/Username:/i)).not.toBeInTheDocument();
});

test("logs out user when logout button is clicked", () => {
  const logoutButton = screen.getByText(/Logout/i);
  fireEvent.click(logoutButton);

  expect(mockLoginUser).toHaveBeenCalledWith(null);
  expect(screen.queryByText(/Username:/i)).not.toBeInTheDocument();
});