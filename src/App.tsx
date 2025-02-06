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
        "http://localhost:5000/lookup",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLookupData();
  };

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
