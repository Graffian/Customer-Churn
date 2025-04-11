"use client";
import React, { useState } from "react";
import styles from "./ChurnPrediction.module.css";

const PredictionResult = () => {
  const [prediction, setPrediction] = useState(null);
  const [showPrediction, setShowPrediction] = useState(false);

  // This would be connected to the form submission in a real implementation
  React.useEffect(() => {
    // Simulate prediction for demo
    const simulatePrediction = () => {
      setShowPrediction(true);
      setPrediction(
        Math.random() > 0.5 ? "High Risk of Churn" : "Low Risk of Churn",
      );
    };

    simulatePrediction();
  }, []);

  return (
    <div className={styles.resultContainer}>
      {showPrediction && (
        <div
          className={styles.predictionBox}
          style={{
            backgroundColor: prediction?.includes("High")
              ? "#fed7d7"
              : "#c6f6d5",
          }}
        >
          <h3 className={styles.resultTitle}>Prediction Result</h3>
          <p className={styles.predictionText}>{prediction}</p>
        </div>
      )}

      <div className={styles.graphContainer}>
        <h3 className={styles.graphTitle}>Customer Churn vs Total Charges</h3>
        <div className={styles.graphArea}>Graph Visualization Area</div>
      </div>
    </div>
  );
};

export default PredictionResult;
