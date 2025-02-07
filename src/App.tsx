import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { isValidInput } from "./utils/validateInput";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLookupData = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/lookup`,
        { query },
        { headers: { "Content-Type": "application/json" } }
      );
      setResult(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Renders a validation message if the input query is invalid and has some content.
   * The message will prompt the user to enter a valid domain or IP address.
   *
   * @returns {JSX.Element | null} - Returns a JSX element with a validation message if the input is invalid, otherwise returns `null`.
   */
  const renderValidationMessage = () => {
    if (!isValidInput(query) && query.length > 0) {
      return (
        <p className="validation-message">
          Please enter a valid domain or IP address.
        </p>
      );
    }
    return null;
  };

  /**
   * Handles the change event for the input field.
   * Updates the state with the current value of the input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input field.
   * @returns {void}
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  /**
   * Handles the form submission event.
   * Prevents the default form submission behavior and calls the `fetchLookupData` function.
   *
   * @param {React.FormEvent} e - The event object from the form submission.
   * @returns {void}
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLookupData();
  };

  /**
   * Clears the result and resets any error messages.
   * Sets the `result` state to `null` and clears the `error` state.
   *
   * @returns {void}
   */
  const handleClear = () => {
    setResult(null);
    setError("");
  };

  return (
    <div className="container">
      <h1>🔍 IP & Domain Lookup</h1>
      <form onSubmit={handleSubmit} className="lookup-form">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter IP or Domain"
          required
        />
        {renderValidationMessage()}
        <button type="submit" disabled={loading || !isValidInput(query)}>
          {loading ? "Searching..." : "Lookup"}
        </button>
      </form>

      {loading && <div className="loader"></div>}

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-card">
          <h2>Result:</h2>
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
