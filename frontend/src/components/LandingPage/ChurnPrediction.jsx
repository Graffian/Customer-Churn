"use client";
import React from "react";
import PredictionForm from "./PredictionForm";
import PredictionResult from "./PredictionResult";
import InsightsDashboard from "./InsightsDashboard";
import styles from "./ChurnPrediction.module.css";

const ChurnPrediction = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Customer Churn Prediction</h1>
      <div className={styles.dashboard}>
        <PredictionForm />
        <section className={styles.resultsSection}>
          <PredictionResult />
          <InsightsDashboard />
        </section>
      </div>
    </main>
  );
};

export default ChurnPrediction;
