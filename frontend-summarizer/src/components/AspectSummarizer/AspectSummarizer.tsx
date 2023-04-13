import React, { useState } from "react";
import "../../styles/AspectSummarizer.css";

const AspectBasedSummarizer = () => {
  const [inputValue, setInputValue] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [selectedAspect, setSelectedAspect] = useState("");
  const [error, setError] = useState("");


  const aspects = ["Nature", "Penalty", "Crime"];

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleSummarizeClick = () => {

    if (!inputValue) {
      setError("Please enter some text before summarizing.");
      setSummaryValue("");
      return;
    }

    if (!selectedAspect) {
      setError("Please select an aspect before summarizing.");
      setSummaryValue("");
      return;
    }

    // Code to summarize the input value and update the summary state based on the selected aspect
    setSummaryValue(`This is the summary for ${selectedAspect} aspect.`);
    setError("");
  };

  const handleResetClick = () => {
    setInputValue("");
    setSummaryValue("");
    setSelectedAspect("");
    setError("");
  };

  const handleAspectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAspect(event.target.value);
  };

  return (
    <div className="summarizer-container">
      <div className="header-container">
        <h1 className="title">Aspect Based Summarizer</h1>
        <div className="aspect-container">
          <label htmlFor="aspect-dropdown">Select an aspect:</label>
          <select id="aspect-dropdown" value={selectedAspect} onChange={handleAspectChange}>
            <option value="">--Select--</option>
            {aspects.map((aspect) => (
              <option key={aspect} value={aspect}>
                {aspect}
              </option>
            ))}
          </select>
        </div>
      </div>

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
            style={{ height: "12rem", padding: "0.5rem" }}
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
            style={{ height: "12rem", padding: "0.5rem" }}
          />
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
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

export default AspectBasedSummarizer;
