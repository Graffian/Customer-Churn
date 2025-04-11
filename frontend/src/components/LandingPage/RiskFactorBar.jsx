import React from "react";
import styles from "./ChurnPrediction.module.css";

const RiskFactorBar = ({ label, percentage, color }) => {
  return (
    <div className={styles.riskFactor}>
      <span className={styles.riskLabel}>{label}</span>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default RiskFactorBar;
