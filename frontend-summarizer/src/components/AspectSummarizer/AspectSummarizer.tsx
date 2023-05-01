import React, { useState } from "react";
import "../../styles/AspectSummarizer.css";

const AspectBasedSummarizer = () => {
  const [inputValue, setInputValue] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [selectedAspect, setSelectedAspect] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add this line to create a new state variable for loading


  const aspects = ["person", "location", "date", "organization"];

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

      

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/aspect-summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputValue,
          aspect: selectedAspect,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      setSummaryValue(data.summary);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleSummarizeClick = async () => {

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
    setError("");
    // setSummaryValue("Summarizing...");

    setIsLoading(true); // Set isLoading to true before fetching the data
    await fetchData();
    setIsLoading(false); // Set isLoading to false after the data has been fetched


    // await fetchData(); // Calling fetchData here

    
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
          <label htmlFor="input" style={{ padding: "0.5rem", color: "#6a3bab", fontWeight: "bold" }}>
            Input:
          </label>
          <textarea
            id="input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Paste your text here"
            style={{ height: "12rem", padding: "0.5rem" }}
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
            style={{ height: "12rem", padding: "0.5rem" }}
          />
          {isLoading && <div className="loader"></div>}
          <p>
            <span className="word-count">
              Word count: {summaryValue.split(/\s+/).filter((word) => word).length}
            </span>
          </p>
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
