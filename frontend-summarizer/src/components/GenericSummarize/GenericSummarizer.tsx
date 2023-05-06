import React, { useState } from "react";
import "../../styles/GenericSummarizer.css";

const GenericSummarizer = () => {
  const [inputLink, setInputLink] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLink(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleSummarizeClick = () => {
    if (!inputValue && !inputLink) {
      setError("Please enter an article link or paste the text.");
      setSummaryValue("");
    } else {
      setIsLoading(true);
      fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputLink ? { link: inputLink } : { text: inputValue })
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
    setInputLink("");
    setInputValue("");
    setSummaryValue("");
    setError("");
  };

  return (
    <div className="summarizer-container">
      <h1 className="title">Generic Summarizer</h1>
      <div className="additional-inputs-container">
        <label htmlFor="inputLink" style={{ padding: "0.5rem", color: "#6a3bab", fontWeight: "bold" }}>
          Article Link:
        </label>
        <input
          type="url"
          id="inputLink"
          value={inputLink}
          onChange={handleLinkInputChange}
          placeholder="Paste the article link here"
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
      </div>
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
            Word count: {inputValue && inputValue.split(/\s+/).filter((word) => word).length}
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
            Word count: {summaryValue && summaryValue.split(/\s+/).filter((word) => word).length}
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
