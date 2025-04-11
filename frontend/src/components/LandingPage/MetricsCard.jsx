import React from "react";
import styles from "./ChurnPrediction.module.css";

const MetricsCard = ({ title, value }) => {
  return (
    <div className={styles.metricsCard}>
      <h4 className={styles.metricsTitle}>{title}</h4>
      <p className={styles.metricsValue}>{value}</p>
    </div>
  );
};

export default MetricsCard;
