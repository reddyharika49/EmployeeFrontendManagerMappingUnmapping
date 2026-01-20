import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ManagerMappingSuccess.module.css";

import Button from "widgets/Button/Button";
import successIcon from "assets/ManagerMappingAndUnmappingAssets/ReMapIcon.svg"; 

const ManagerMappingSuccess = ({ setIsSuccess }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.successWrapper}>
      <div className={styles.successCard}>
        <img src={successIcon} alt="success" />

        <h3>Employees Un-mapped Successfully</h3>

        <div className={styles.actions}>
          <Button
            buttonname="Back"
            variant="secondary"
            width="140px"
            onClick={() => setIsSuccess(false)}
          />

          <Button
            buttonname="Continue to Employee Management"
            variant="primary"
            width="260px"
            onClick={() =>
              navigate("/scopes/employee/employeeManager/manage")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerMappingSuccess;
