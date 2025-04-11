"use client";
import React, { useState } from "react";
import styles from "./ChurnPrediction.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const FORM_FIELDS = [
  { id: "tenure", label: "Tenure (months)" },
  { id: "gender", label: "Gender" },
  { id: "seniorCitizen", label: "Senior Citizen" },
  { id: "partner", label: "Partner" },
  { id: "dependents", label: "Dependents" },
  { id: "phoneService", label: "Phone Service" },
  { id: "multipleLines", label: "Multiple Lines" },
  { id: "internetService", label: "Internet Service" },
  { id: "contract", label: "Contract" },
  { id: "onlineSecurity", label: "Online Security" },
  { id: "onlineBackup", label: "Online Backup" },
  { id: "deviceProtection", label: "Device Protection" },
  { id: "techSupport", label: "Tech Support" },
  { id: "streamingTV", label: "Streaming TV" },
  { id: "streamingMovies", label: "Streaming Movies" },
  { id: "paperlessBilling", label: "Paperless Billing" },
];

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    tenure: "",
    gender: "",
    seniorCitizen: "",
    partner: "",
    dependents: "",
    phoneService: "",
    multipleLines: "",
    internetService: "",
    contract: "",
    onlineSecurity: "",
    onlineBackup: "",
    deviceProtection: "",
    techSupport: "",
    streamingTV: "",
    streamingMovies: "",
    paperlessBilling: "",
    monthlyCharges: "",
    totalCharges: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePredict = async () => {
    try {
      setError(null);
      // Convert string values to numbers
      const formattedData = {
        ...formData,
        tenure: parseInt(formData.tenure),
        monthlyCharges: parseFloat(formData.monthlyCharges),
        totalCharges: parseFloat(formData.totalCharges)
      };

      const response = await fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      setPrediction(result.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
      setError(error.message);
    }
  };

  const getChartData = (prediction) => {
    return {
      labels: ['Churn Risk', 'Retention Likelihood'],
      datasets: [
        {
          data: [prediction, 1 - prediction],
          backgroundColor: [
            prediction > 0.5 ? '#e74c3c' : '#27ae60',
            '#f8f9fa'
          ],
          borderColor: [
            prediction > 0.5 ? '#c0392b' : '#219a52',
            '#e2e8f0'
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            return `${context.label}: ${(value * 100).toFixed(1)}%`;
          }
        }
      }
    },
    cutout: '70%',
  };

  return (
    <section className={styles.formCard}>
      <div className={styles.formGrid}>
        {FORM_FIELDS.map(({ id, label }) => (
          <div className={styles.formField} key={id}>
            <label className={styles.fieldLabel} htmlFor={id}>
              {label}
            </label>
            {id === "tenure" ? (
              <input
                type="number"
                id={id}
                className={styles.numberInput}
                value={formData[id]}
                onChange={(e) => handleInputChange(id, e.target.value)}
                min="0"
                placeholder="Enter months"
              />
            ) : (
              <select
                id={id}
                className={styles.selectInput}
                value={formData[id]}
                onChange={(e) => handleInputChange(id, e.target.value)}
              >
                <option value="">Select</option>
                {id === "gender" ? (
                  <>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </>
                ) : [
                    "techSupport",
                    "onlineBackup",
                    "deviceProtection",
                    "streamingTV",
                  ].includes(id) ? (
                  <>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">
                      No internet service
                    </option>
                  </>
                ) : id === "multipleLines" ? (
                  <>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No phone service">No phone service</option>
                  </>
                ) : id === "internetService" ? (
                  <>
                    <option value="DSL">DSL</option>
                    <option value="Fiber optic">Fiber optic</option>
                    <option value="No">No</option>
                  </>
                ) : id === "contract" ? (
                  <>
                    <option value="Month-to-month">Month-to-month</option>
                    <option value="One year">One year</option>
                    <option value="Two year">Two year</option>
                  </>
                ) : (
                  <>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </>
                )}
              </select>
            )}
          </div>
        ))}

        <div className={styles.formField}>
          <label className={styles.fieldLabel} htmlFor="monthlyCharges">
            Monthly Charges
          </label>
          <input
            id="monthlyCharges"
            type="number"
            className={styles.numberInput}
            value={formData.monthlyCharges}
            onChange={(e) =>
              handleInputChange("monthlyCharges", e.target.value)
            }
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldLabel} htmlFor="totalCharges">
            Total Charges
          </label>
          <input
            id="totalCharges"
            type="number"
            className={styles.numberInput}
            value={formData.totalCharges}
            onChange={(e) => handleInputChange("totalCharges", e.target.value)}
          />
        </div>
      </div>

      <button className={styles.predictButton} onClick={handlePredict}>
        Predict Churn
      </button>

      {error && (
        <div className={styles.errorMessage}>
          Error: {error}
        </div>
      )}

      {prediction !== null && (
        <div className={styles.predictionResult}>
          <h3>Prediction Result</h3>
          <div className={styles.predictionValue}>
            Churn Probability: {(prediction * 100).toFixed(2)}%
          </div>
          <div className={styles.predictionInterpretation}>
            {prediction > 0.5 ? (
              <span className={styles.highRisk}>High risk of churning</span>
            ) : (
              <span className={styles.lowRisk}>Low risk of churning</span>
            )}
          </div>
          
          <div className={styles.chartContainer}>
            <Doughnut data={getChartData(prediction)} options={chartOptions} />
          </div>
        </div>
      )}
    </section>
  );
};

export default PredictionForm;
