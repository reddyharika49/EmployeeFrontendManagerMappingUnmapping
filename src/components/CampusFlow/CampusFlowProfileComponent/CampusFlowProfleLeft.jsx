import React from "react";
import styles from "../CampusFlowProfileComponent/CampusFlowMiddle.module.css";

const CampusFlowProfileLeft = () => {
  return (
    <div>
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <p className={styles.label}>Payroll Code</p>
          <p className={styles.value}>2006</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Year of Established</p>
          <p className={styles.value}>2006</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Zone</p>
          <p className={styles.value}>Jubilee Hills</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>No Of Employees</p>
          <p className={styles.value}>21</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Organization</p>
          <p className={styles.value}>Varsity Education</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Campus Managed By</p>
          <p className={styles.value}>Venkat Boppana</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Board Code</p>
          <p className={styles.value}>08276</p>
        </div>
      </div>
    </div>
  );
};

export default CampusFlowProfileLeft;
