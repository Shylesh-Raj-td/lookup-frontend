import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import App from "../App";

jest.mock("axios");

describe("App Component", () => {
  const mockResponse = { data: { ip: "127.0.0.1", domain: "localhost" } };

  beforeEach(() => {
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the input and button", () => {
    render(<App />);
    expect(
      screen.getByPlaceholderText("Enter IP or Domain")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /lookup/i })).toBeInTheDocument();
  });

  it("should display validation message for invalid input", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Enter IP or Domain");

    userEvent.type(input, "invalid_domain");
    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a valid domain or IP address./i)
      ).toBeInTheDocument();
    });
  });

  it("should handle valid input and show result on successful API call", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Enter IP or Domain");

    userEvent.type(input, "127.0.0.1");
    fireEvent.submit(screen.getByRole("button"));

    expect(
      screen.getByRole("button", { name: /searching.../i })
    ).toBeInTheDocument();

    await screen.findByText(/Result:/i);
    expect(screen.getByText(/127.0.0.1/i)).toBeInTheDocument();
  });

  it("should show error message on failed API call", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

    render(<App />);
    const input = screen.getByPlaceholderText("Enter IP or Domain");

    userEvent.type(input, "invalid_domain");
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      // eslint-disable-next-line testing-library/await-async-query
      screen.findByText(/Failed to fetch data. Please try again./i);
    });
  });

  it("should disable the submit button when input is invalid or loading", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Enter IP or Domain");
    const button = screen.getByRole("button", { name: /lookup/i });

    expect(button).toBeDisabled();

    userEvent.type(input, "127.0.0.1");

    fireEvent.click(screen.getByRole("button"));
    expect(button).toBeDisabled();
  });
});
