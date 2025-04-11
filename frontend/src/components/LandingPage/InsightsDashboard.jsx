import React from "react";
import MetricsCard from "./MetricsCard";
import RiskFactorBar from "./RiskFactorBar";
import styles from "./ChurnPrediction.module.css";

const InsightsDashboard = () => {
  return (
    <section className={styles.insightsSection}>
      <div className={styles.metricsGrid}>
        <MetricsCard title="Average Monthly Revenue" value="$2,450" />
        <MetricsCard title="Churn Rate" value="15.8%" />
        <MetricsCard title="Customer Lifetime" value="24 months" />
      </div>

      <div className={styles.insightsContainer}>
        <h3 className={styles.insightsTitle}>Customer Insights</h3>
        <div className={styles.insightsGrid}>
          <div className={styles.trendsCard}>
            <h4 className={styles.cardTitle}>Service Usage Trends</h4>
            <ul className={styles.trendsList}>
              <li className={styles.trendItem}>
                <span className={styles.trendUp}>↑</span>
                <span>Streaming services adoption up by 25%</span>
              </li>
              <li className={styles.trendItem}>
                <span className={styles.trendDown}>↓</span>
                <span>Phone service usage down by 10%</span>
              </li>
            </ul>
          </div>

          <div className={styles.riskCard}>
            <h4 className={styles.cardTitle}>Risk Factors</h4>
            <div className={styles.riskFactors}>
              <RiskFactorBar
                label="Contract Length"
                percentage={75}
                color="#4299e1"
              />
              <RiskFactorBar
                label="Price Sensitivity"
                percentage={90}
                color="#f56565"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsDashboard;
