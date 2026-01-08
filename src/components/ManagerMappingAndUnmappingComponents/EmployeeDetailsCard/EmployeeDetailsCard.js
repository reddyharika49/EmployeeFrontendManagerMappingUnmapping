import React, { useState } from 'react';
import { Tooltip } from "@mui/material";
import styles from './EmployeeDetailsCard.module.css';
import profilePhoto from 'assets/ManagerMappingAndUnmappingAssets/profilePhoto.svg';
import iconSvg from 'assets/ManagerMappingAndUnmappingAssets/icon.svg';
import callIcon from 'assets/ManagerMappingAndUnmappingAssets/Call.svg';
import emailIcon from 'assets/ManagerMappingAndUnmappingAssets/email.svg';
import callIconOutLine from "assets/RightSideInformation Icons/callIconOutLine.svg";
// import mailIconOutline from "../../assets/RightSideInformation Icons/MailIconOutLine.svg"; 
import minMaxIcon from 'assets/ManagerMappingAndUnmappingAssets/minAndMaxIcon.svg';
import maximizeIcon from 'assets/ManagerMappingAndUnmappingAssets/Maximize.svg';
import lineDecorator from 'assets/ManagerMappingAndUnmappingAssets/lineDecorator.svg';

const EmployeeDetailsCard = ({ employee, hideHeader = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);


  const phoneNumber =
  employee?.emergencyContact?.phoneNumber ||
  employee?.phoneNumber ||
  "+91 9949522639";

const email =
  employee?.emergencyContact?.email ||
  employee?.email ||
  "support@school.com";


  const handleToggle = (e) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };
  const employeeData = employee || {
    id: 'HYD 5627182',
    name: 'Devansh.N',
    department: 'IT Cell',
    level: 'Level 4',
    type: 'Permanent',
    campus: {
      name: 'Name Of The Campus',
      address: 'Infinity Towers, Plot No 2-91/31, Near N Convention Road, HITEC City, Hyderabad, Telangana 500081'
    },
    reportingManager: 'Vamsi Ramana',
    manager: 'Raja',
    project: 'IPL'
  };

  return (
    <div className={styles.employeeDetailsCard}>
      {!hideHeader && (
        <>
          {/* Top Section - Employee Header */}
          <div className={styles.employeeHeader}>
            <div className={styles.employeeProfile}>
              <figure>
                <img
                  src={profilePhoto}
                  alt="Employee Profile"
                  className={styles.profileImage}
                />
              </figure>
            </div>
            <div className={styles.employeeInfo}>
              <div className={styles.employeeId}>{employeeData.id}</div>
              <div className={styles.employeeName}>{employeeData.name}</div>
              <div className={styles.employeeDepartment}>{employeeData.department}</div>
              <div className={styles.employeeTags}>
                <span className={`${styles.tag} ${styles.tagLevel}`}>{employeeData.level}</span>
                <span className={`${styles.tag} ${styles.tagPermanent}`}>{employeeData.type}</span>
              </div>
            </div>
          </div>

          {/* Decorative Line */}
          <div className={styles.decorativeLine}>
            <img src={lineDecorator} />
          </div>
        </>
      )}

      {/* Campus Details Section - From Current Campus to IPL */}
      <div className={styles.campusDetailsWrapper}>
        <div className={`${styles.campusDetailsSection} ${isCollapsed ? styles.campusDetailsSectionCollapsed : ''}`}>
          {/* Current Campus Section */}
          <div className={styles.currentCampusSection}>
            <div className={styles.campusLeft}>
              <div className={styles.campusTopRow}>
                <div className={styles.campusIcon}>
                  <figure>
                    <img
                      src={iconSvg}
                      alt="Campus Icon"
                      className={styles.campusIconImage}
                    />
                  </figure>
                </div>
                <div className={styles.campusTitleRow}>
                  <div className={styles.campusLabel}>Current Campus</div>
                  <div className={styles.campusName}>{employeeData.campus.name}</div>
                </div>
              </div>
              <div className={`${styles.campusAddress} ${isCollapsed ? styles.campusAddressHidden : ''}`}>
                {employeeData.campus.address}
              </div>
            </div>
            <div className={styles.campusIcons}>
              <div className={styles.iconCircle}>
                {/* <figure>
                <img 
                  src={callIcon} 
                  alt="Call" 
                  className={styles.iconImage}
                />
              </figure> */}
                <Tooltip
                  title={
                    phoneNumber ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <img
                          src={callIconOutLine}
                          alt="Phone"
                          style={{ width: "14px", height: "14px" }}
                        />
                        <span>{phoneNumber}</span>
                      </div>
                    ) : (
                      "No number available"
                    )
                  }
                  arrow
                  placement="top"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#FFF",   // custom tooltip background
                        color: "#3425FF",          // tooltip text color
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "1px solid #3425FF", // ✅ add this line
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                      },
                    },
                    arrow: {
                      sx: {
                        color: "#FFF", // arrow color same as tooltip background
                        "&::before": {
                          border: "1px solid #3425FF", // ✅ optional: add border around arrow
                        },
                      },
                    },
                  }}
                >
                  <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
                    <img
                      src={callIcon}
                      alt="Call"
                      className={styles.iconImage}
                    />
                  </figure>
                </Tooltip>
              </div>
              <div className={styles.iconCircle}>
                {/* <figure>
                  <img
                    src={emailIcon}
                    alt="Email"
                    className={styles.iconImage}
                  />
                </figure> */}
                            <Tooltip
     title={
    email ? (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <img
           src={emailIcon}
          alt="Phone"
          style={{ width: "14px", height: "14px"}}
        />
        <span>{email}</span>
      </div>
    ) : (
      "No number available"
    )
  }
  arrow
  placement="top"
  componentsProps={{
    tooltip: {
      sx: {
        backgroundColor: "#FFF",   // custom tooltip background
        color: "#3425FF",          // tooltip text color
        fontSize: "0.75rem",
        fontWeight: 500,
        padding: "6px 10px",
        borderRadius: "6px",
        border: "1px solid #3425FF", // ✅ add this line
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
      },
    },
    arrow: {
      sx: {
        color: "#FFF", // arrow color same as tooltip background
        "&::before": {
          border: "1px solid #3425FF", // ✅ optional: add border around arrow
        },
      },
    },
  }}
>
  <figure style={{ cursor: email ? "pointer" : "default" }}>
  <img 
                  src={emailIcon} 
                  alt="Call" 
                  className={styles.iconImage}
                />
  </figure>
</Tooltip>
              </div>
              <div className={`${styles.iconCircle} ${styles.iconRemap} ${isCollapsed ? styles.iconRemapCollapsed : ''}`} onClick={handleToggle}>
                <figure>
                  <img
                    src={isCollapsed ? maximizeIcon : minMaxIcon}
                    alt="Toggle"
                    className={styles.iconImage}
                  />
                </figure>
              </div>
            </div>
          </div>

          <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
            <div className={styles.managerLeft}>
              <span className={styles.managerLabel}>Reporting Manager: </span>
              <span className={styles.managerName}>{employeeData.reportingManager || 'Vamsi Ramana'}</span>
            </div>
            <div className={styles.managerRight}>
              <div className={styles.managerPhoneIcon}>
                {/* <figure>
                  <img 
                    src={callIcon} 
                    alt="Call Manager" 
                    className={styles.iconImage}
                  />
                </figure> */}
                <Tooltip
                  title={
                    phoneNumber ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <img
                          src={callIconOutLine}
                          alt="Phone"
                          style={{ width: "14px", height: "14px" }}
                        />
                        <span>{phoneNumber}</span>
                      </div>
                    ) : (
                      "No number available"
                    )
                  }
                  arrow
                  placement="top"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#FFF",   // custom tooltip background
                        color: "#3425FF",          // tooltip text color
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "1px solid #3425FF", // ✅ add this line
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                      },
                    },
                    arrow: {
                      sx: {
                        color: "#FFF", // arrow color same as tooltip background
                        "&::before": {
                          border: "1px solid #3425FF", // ✅ optional: add border around arrow
                        },
                      },
                    },
                  }}
                >
                  <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
                    <img
                      src={callIcon}
                      alt="Call"
                      className={styles.iconImage}
                    />
                  </figure>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
            <div className={styles.managerLeft}>
              <span className={styles.managerLabel}>Manager: </span>
              <span className={styles.managerName}>{employeeData.manager}</span>
            </div>
            <div className={styles.managerRight}>
              <div className={styles.managerPhoneIcon}>
                {/* <figure>
                  <img 
                    src={callIcon} 
                    alt="Call Manager" 
                    className={styles.iconImage}
                  />
                </figure> */}
                <Tooltip
                  title={
                    phoneNumber ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <img
                          src={callIconOutLine}
                          alt="Phone"
                          style={{ width: "14px", height: "14px" }}
                        />
                        <span>{phoneNumber}</span>
                      </div>
                    ) : (
                      "No number available"
                    )
                  }
                  arrow
                  placement="top"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#FFF",   // custom tooltip background
                        color: "#3425FF",          // tooltip text color
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "1px solid #3425FF", // ✅ add this line
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                      },
                    },
                    arrow: {
                      sx: {
                        color: "#FFF", // arrow color same as tooltip background
                        "&::before": {
                          border: "1px solid #3425FF", // ✅ optional: add border around arrow
                        },
                      },
                    },
                  }}
                >
                  <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
                    <img
                      src={callIcon}
                      alt="Call"
                      className={styles.iconImage}
                    />
                  </figure>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.bottomBar} ${isCollapsed ? styles.bottomBarHidden : ''}`}>
          — {employeeData.project} —
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsCard;

