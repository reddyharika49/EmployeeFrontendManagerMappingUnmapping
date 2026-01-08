import React from 'react';
import styles from './AddEmployeeWidget.module.css';

const AddEmployeeWidget = ({ onClick }) => {
  return (
    <div className={styles.addEmployeeWidget} onClick={onClick}>
      <div className={styles.addEmployeeIcon}>+</div>
      <div className={styles.addEmployeeText}>Add More Employees</div>
    </div>
  );
};

export default AddEmployeeWidget;

