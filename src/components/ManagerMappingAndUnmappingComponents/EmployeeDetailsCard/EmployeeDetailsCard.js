// import React, { useState } from 'react';
// import { Tooltip } from "@mui/material";
// import styles from './EmployeeDetailsCard.module.css';
// import profilePhoto from 'assets/ManagerMappingAndUnmappingAssets/profilePhoto.svg';
// import iconSvg from 'assets/ManagerMappingAndUnmappingAssets/icon.svg';
// import callIcon from 'assets/ManagerMappingAndUnmappingAssets/Call.svg';
// import emailIcon from 'assets/ManagerMappingAndUnmappingAssets/email.svg';
// import callIconOutLine from "assets/RightSideInformation Icons/callIconOutLine.svg";
// import minMaxIcon from 'assets/ManagerMappingAndUnmappingAssets/minAndMaxIcon.svg';
// import maximizeIcon from 'assets/ManagerMappingAndUnmappingAssets/Maximize.svg';
// import lineDecorator from 'assets/ManagerMappingAndUnmappingAssets/lineDecorator.svg';
// import successBadge from 'assets/ManagerMappingAndUnmappingAssets/UnMapScuccess.svg'; // Reuse or add your success icon

// const EmployeeDetailsCard = ({ employee, hideHeader = false, isUnmapped = false }) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const phoneNumber = employee?.emergencyContact?.phoneNumber || employee?.phoneNumber || "+91 9949522639";
//   const email = employee?.emergencyContact?.email || employee?.email || "support@school.com";

//   const handleToggle = (e) => {
//     e.stopPropagation();
//     setIsCollapsed(!isCollapsed);
//   };

//   const employeeData = employee || {
//     id: 'HYD 5627182',
//     name: 'Devansh.N',
//     department: 'IT Cell',
//     level: 'Level 4',
//     type: 'Permanent',
//     campus: { name: 'Name Of The Campus', address: 'Address...' },
//     reportingManager: 'Vamsi Ramana',
//     manager: 'Raja',
//     project: 'IPL'
//   };

//   return (
//     <div className={`${styles.employeeDetailsCard} ${isUnmapped ? styles.successCardBorder : ''}`}>
//       {!hideHeader && (
//         <>
//           <div className={styles.employeeHeader}>
//             <div className={styles.employeeProfile}>
//               <figure>
//                 <img src={profilePhoto} alt="Profile" className={styles.profileImage} />
//               </figure>
//             </div>
//             <div className={styles.employeeInfo}>
//               <div className={styles.employeeId}>{employeeData.id}</div>
//               <div className={styles.employeeName}>{employeeData.name}</div>
//               <div className={styles.employeeDepartment}>{employeeData.department}</div>
//               <div className={styles.employeeTags}>
//                 <span className={`${styles.tag} ${styles.tagLevel}`}>{employeeData.level}</span>
//                 <span className={`${styles.tag} ${styles.tagPermanent}`}>{employeeData.type}</span>
//               </div>
//             </div>
//           </div>
//           <div className={styles.decorativeLine}>
//             <img src={lineDecorator} alt="line" />
//           </div>
//         </>
//       )}

//       <div className={styles.campusDetailsWrapper}>
//         {!isUnmapped ? (
//           <>
//             <div className={`${styles.campusDetailsSection} ${isCollapsed ? styles.campusDetailsSectionCollapsed : ''}`}>
//               <div className={styles.currentCampusSection}>
//                 <div className={styles.campusLeft}>
//                   <div className={styles.campusTopRow}>
//                     <div className={styles.campusIcon}>
//                       <img src={iconSvg} alt="Campus" />
//                     </div>
//                     <div className={styles.campusTitleRow}>
//                       <div className={styles.campusLabel}>Current Campus</div>
//                       <div className={styles.campusName}>{employeeData.campus.name}</div>
//                     </div>
//                   </div>
//                   <div className={`${styles.campusAddress} ${isCollapsed ? styles.campusAddressHidden : ''}`}>
//                     {employeeData.campus.address}
//                   </div>
//                 </div>
//                 <div className={styles.campusIcons}>
//                   <div className={styles.iconCircle}>
//                     <Tooltip title={phoneNumber} arrow placement="top">
//                       <img src={callIcon} alt="Call" className={styles.iconImage} />
//                     </Tooltip>
//                   </div>
//                   <div className={styles.iconCircle}>
//                     <Tooltip title={email} arrow placement="top">
//                       <img src={emailIcon} alt="Email" className={styles.iconImage} />
//                     </Tooltip>
//                   </div>
//                   <div className={`${styles.iconCircle} ${styles.iconRemap}`} onClick={handleToggle}>
//                     <img src={isCollapsed ? maximizeIcon : minMaxIcon} alt="Toggle" />
//                   </div>
//                 </div>
//               </div>

//               {/* Reporting Manager Section */}
//               <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
//                 <div className={styles.managerLeft}>
//                   <span className={styles.managerLabel}>Reporting Manager: </span>
//                   <span className={styles.managerName}>{employeeData.reportingManager}</span>
//                 </div>
//                 <div className={styles.managerRight}><img src={callIcon} alt="Call" /></div>
//               </div>
              
//               {/* Manager Section */}
//               <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
//                 <div className={styles.managerLeft}>
//                   <span className={styles.managerLabel}>Manager: </span>
//                   <span className={styles.managerName}>{employeeData.manager}</span>
//                 </div>
//                 <div className={styles.managerRight}><img src={callIcon} alt="Call" /></div>
//               </div>
//             </div>
//             <div className={`${styles.bottomBar} ${isCollapsed ? styles.bottomBarHidden : ''}`}>
//               — {employeeData.project} —
//             </div>
//           </>
//         ) : (
//           /* Success UI State */
//           <div className={styles.unmappedSuccessContainer}>
//             <img src={successBadge} alt="Success" className={styles.successIcon} />
//             <p className={styles.successText}>Unmapped Successful</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployeeDetailsCard;


import React, { useState } from 'react';
import { Tooltip } from "@mui/material";
import styles from './EmployeeDetailsCard.module.css';
import profilePhoto from 'assets/ManagerMappingAndUnmappingAssets/profilePhoto.svg';
import iconSvg from 'assets/ManagerMappingAndUnmappingAssets/icon.svg';
import callIcon from 'assets/ManagerMappingAndUnmappingAssets/Call.svg';
import emailIcon from 'assets/ManagerMappingAndUnmappingAssets/email.svg';
import minMaxIcon from 'assets/ManagerMappingAndUnmappingAssets/minAndMaxIcon.svg';
import maximizeIcon from 'assets/ManagerMappingAndUnmappingAssets/Maximize.svg';
import lineDecorator from 'assets/ManagerMappingAndUnmappingAssets/lineDecorator.svg';
import successBadge from 'assets/ManagerMappingAndUnmappingAssets/UnMapScuccess.svg';

const EmployeeDetailsCard = ({
  employee,
  hideHeader = false,
  isUnmapped = false,
  hideSuccess = false 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle for the expansion/collapse of campus details
  const handleToggle = (e) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  // Data Normalization
  const employeeData = employee || {
    id: '—',
    name: '—',
    department: '—',
    level: '—',
    type: '—',
    campus: { name: '—', address: '—' },
    reportingManager: '—',
    manager: '—',
    project: '—'
  };

  const phoneNumber = employeeData.phoneNumber || "+91 0000000000";
  const email = employeeData.email || "support@school.com";

  {console.log("RENDERED AT:", new Date().getTime(), "isUnmapped:", isUnmapped)}

  return (
    <div className={`${styles.employeeDetailsCard} ${isUnmapped && !hideSuccess ? styles.successCardBorder : ''}`}>
      
      {/* 1. Header Section: Profile Photo and Basic Info */}
      {!hideHeader && (
        <>
          <div className={styles.employeeHeader}>
            <div className={styles.employeeProfile}>
              <figure>
                <img src={profilePhoto} alt="Profile" className={styles.profileImage} />
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
          <div className={styles.decorativeLine}>
            <img src={lineDecorator} alt="line" />
          </div>
        </>
      )}

      {/* 2. Campus Details Section */}
      <div className={styles.campusDetailsWrapper}>
  {/* If hideSuccess is true, we skip the success check entirely */}
  {isUnmapped && !hideSuccess ? (
    <div className={styles.unmappedSuccessContainer}>
      <img src={successBadge} alt="Success" className={styles.successIcon} />
      <p className={styles.successText}>Unmapped Successful</p>
    </div>
  ) : (
    /* This block now renders if isUnmapped is false OR if hideSuccess is true */
    <>
      <div className={`${styles.campusDetailsSection} ${isCollapsed ? styles.campusDetailsSectionCollapsed : ''}`}>
        <div className={styles.currentCampusSection}>
          <div className={styles.campusLeft}>
            <div className={styles.campusTopRow}>
              <div className={styles.campusIcon}><img src={iconSvg} alt="Campus" /></div>
              <div className={styles.campusTitleRow}>
                <div className={styles.campusLabel}>Current Campus</div>
                <div className={styles.campusName}>{employeeData.campus?.name || "—"}</div>
              </div>
            </div>
            <div className={`${styles.campusAddress} ${isCollapsed ? styles.campusAddressHidden : ''}`}>
              {employeeData.campus?.address || "No address found"}
            </div>
          </div>
          <div className={styles.campusIcons}>
            <div className={styles.iconCircle}>
              <Tooltip title={phoneNumber} arrow placement="top">
                <img src={callIcon} alt="Call" className={styles.iconImage} />
              </Tooltip>
            </div>
            <div className={styles.iconCircle}>
              <Tooltip title={email} arrow placement="top">
                <img src={emailIcon} alt="Email" className={styles.iconImage} />
              </Tooltip>
            </div>
            <div className={`${styles.iconCircle} ${styles.iconRemap}`} onClick={handleToggle}>
              <img src={isCollapsed ? maximizeIcon : minMaxIcon} alt="Toggle" />
            </div>
          </div>
        </div>

        {/* Manager Sections */}
        <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
          <div className={styles.managerLeft}>
            <span className={styles.managerLabel}>Reporting Manager: </span>
            <span className={styles.managerName}>{employeeData.reportingManager || "—"}</span>
          </div>
          <div className={styles.managerRight}><img src={callIcon} alt="Call" className={styles.iconImage} /></div>
        </div>
        
        <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
          <div className={styles.managerLeft}>
            <span className={styles.managerLabel}>Manager: </span>
            <span className={styles.managerName}>{employeeData.manager || "—"}</span>
          </div>
          <div className={styles.managerRight}><img src={callIcon} alt="Call" className={styles.iconImage} /></div>
        </div>
      </div>

      <div className={`${styles.bottomBar} ${isCollapsed ? styles.bottomBarHidden : ''}`}>
        — {employeeData.project || "—"} —
      </div>
    </>
  )}
</div>
    </div>
  );
};

export default EmployeeDetailsCard;