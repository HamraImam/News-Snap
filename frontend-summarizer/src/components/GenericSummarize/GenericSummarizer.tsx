import React, { useState } from "react";
import "../../styles/GenericSummarizer.css";

const GenericSummarizer = () => {
  const [inputValue, setInputValue] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleSummarizeClick = () => {
    if (!inputValue) {
      setError("Please enter some text to summarize.");
      setSummaryValue("");
    } else {
      // Code to summarize the input value and update the summary state
      setSummaryValue("This is the summary.");
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
          <label htmlFor="input" style={{ padding: "0.5rem" }}>
            Input:
          </label>
          <textarea
            id="input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Paste your text here"
            style={{ height: "15rem", padding: "0.5rem" }}
          />
        </div>
        <div className="output-container">
          <label htmlFor="summary" style={{ padding: "0.5rem" }}>
            Summary:
          </label>
          <textarea
            id="summary"
            value={summaryValue}
            readOnly
            style={{ height: "15rem", padding: "0.5rem" }}
          />
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
