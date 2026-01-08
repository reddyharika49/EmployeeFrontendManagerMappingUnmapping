import React from "react";
import styles from "./EmployeeDesignationCard.module.css";
import CallIcon from "../../assets/campusFlowIcons/callIcon.svg";
import MailIcon from "../../assets/campusFlowIcons/SmsIcon.svg";

const EmployeeDesignationCard = ({
  image,
  employeeId,
  name,
  gender,
  age,
  designation,
  designationIcon,
  subject,
  onCall,
  onMail,
}) => {
  return (
    <div className={styles.card}>
      {/* Top */}
      <div className={styles.top}>
        <img src={image} alt={name} className={styles.avatar} />

        <div className={styles.info}>
          <div className={styles.empId}>
            <span>Employee ID:<br></br></span>
            <strong>{employeeId}</strong>
          </div>

          <div className={styles.name}>{name}</div>

          <div className={styles.meta}>
            <span className={styles.genderIcon}>
              {gender === "Male" ? "♂" : "♀"}
            </span>
            <span>{gender}</span>
            <span className={styles.dot}>•</span>
            <span>{age} Yrs</span>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Bottom */}
      <div className={styles.bottom}>
        <div className={styles.badges}>
          {/* Always show designation */}
          <span className={styles.designation}>
            {designationIcon && (
              <img
                src={designationIcon}
                alt={designation}
                className={styles.designationIcon}
              />
            )}
            {designation}
          </span>
          {/* Show subject only if it exists */}
          {subject && (
            <span className={styles.subject}>{subject}</span>
          )}
        </div>

        <div className={styles.actions}>
          <button onClick={onCall} className={styles.iconBtn}>
            <img src={CallIcon} alt="Call" />
          </button>

          <button onClick={onMail} className={styles.iconBtn}>
            <img src={MailIcon} alt="Mail" />
          </button>
        </div>
      </div>
    </div>
  );
};


export default EmployeeDesignationCard;
