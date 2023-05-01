import React, { useState } from "react";
import "../../styles/GenericSummarizer.css";

const GenericSummarizer = () => {
  const [inputValue, setInputValue] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleSummarizeClick = () => {
    if (!inputValue) {
      setError("Please enter some text to summarize.");
      setSummaryValue("");
    } else {
      setIsLoading(true);
      fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: inputValue })
      })
        .then(response => response.json())
        .then(data => {
          setSummaryValue(data.summary);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false);
        });

      setError("");
    }
  };

  const handleResetClick = () => {
    setInputValue("");
    setSummaryValue("");
    setError("");
  };

  return (
    <div className="summarizer-container">
      <h1 className="title">Generic Summarizer</h1>
      <div className="input-output-container">
        <div className="input-container">
          <label htmlFor="input" style={{ padding: "0.5rem", color: "#6a3bab", fontWeight: "bold" }}>
            Input:
          </label>
          <textarea
            id="input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Paste your text here"
            style={{ height: "15rem", padding: "0.5rem" }}
          />
          <p>
            <span className="word-count">
              Word count: {inputValue.split(/\s+/).filter((word) => word).length}
            </span>
          </p>
        </div>
        <div className="output-container">
          <label htmlFor="summary" style={{ padding: "0.5rem", color: "#6a3bab", fontWeight: "bold" }}>
            Summary:
          </label>
          <textarea
            id="summary"
            value={summaryValue}
            readOnly
            style={{ height: "15rem", padding: "0.5rem" }}
          />
          {isLoading && <div className="loader"></div>}
          <p>
            <span className="word-count">
              Word count: {summaryValue.split(/\s+/).filter((word) => word).length}
            </span>
          </p>
        </div>
      </div>
      {error && (
        <div style={{ color: "red", margin: "1rem" }}>{error}</div>
      )}
      <div className="button-container">
        <button className="summarize-btn" onClick={handleSummarizeClick}>
          Summarize
        </button>
        <div style={{ width: "1rem" }}></div>
        <button className="reset-btn" onClick={handleResetClick}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default GenericSummarizer;
