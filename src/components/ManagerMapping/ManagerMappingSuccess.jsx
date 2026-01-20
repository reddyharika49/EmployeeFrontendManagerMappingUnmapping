import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import styles from "./ManagerMappingSuccess.module.css";

import Button from "widgets/Button/Button";
// import successIcon from "assets/ManagerMappingAndUnmappingAssets/ReMapIcon.svg"; 
import successAnimationData from 'assets/SkillTest/success-animation.json';

const ManagerMappingSuccess = ({ successTitle, onBack, onContinue }) => {
  return (
    <div className={styles.successWrapper}>
      <div className={styles.successCard}>
      <Lottie animationData={successAnimationData} loop={false} />

        <h3>{successTitle}</h3>

        <div className={styles.actions}>
          <Button
            buttonname="Back"
            variant="secondary"
            width="140px"
            onClick={onBack}
          />

          <Button
            buttonname="Continue to Employee Management"
            variant="primary"
            width="260px"
            onClick={onContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerMappingSuccess;