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
//                   <Tooltip
//                   title={
//                     phoneNumber ? (
//                       <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//                         <img
//                           src={callIconOutLine}
//                           alt="Phone"
//                           style={{ width: "14px", height: "14px" }}
//                         />
//                         <span>{phoneNumber}</span>
//                       </div>
//                     ) : (
//                       "No number available"
//                     )
//                   }
//                   arrow
//                   placement="top"
//                   componentsProps={{
//                     tooltip: {
//                       sx: {
//                         backgroundColor: "#FFF", // custom tooltip background
//                         color: "#3425FF", // tooltip text color
//                         fontSize: "0.75rem",
//                         fontWeight: 500,
//                         padding: "6px 10px",
//                         borderRadius: "6px",
//                         border: "1px solid #3425FF", // ✅ add this line
//                         boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
//                       },
//                     },
//                     arrow: {
//                       sx: {
//                         color: "#FFF", // arrow color same as tooltip background
//                         "&::before": {
//                           border: "1px solid #3425FF", // ✅ optional: add border around arrow
//                         },
//                       },
//                     },
//                   }}
//                 >
//                   <figure style={{ cursor: phoneNumber ? "pointer" : "default" }}>
//                     <img
//                       src={callIcon}
//                       alt="Call"
//                       className={styles.iconImage}
//                     />
//                   </figure>
//                 </Tooltip>
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
import callIconOutLine from "assets/RightSideInformation Icons/callIconOutLine.svg";
import minMaxIcon from 'assets/ManagerMappingAndUnmappingAssets/minAndMaxIcon.svg';
import maximizeIcon from 'assets/ManagerMappingAndUnmappingAssets/Maximize.svg';
import lineDecorator from 'assets/ManagerMappingAndUnmappingAssets/lineDecorator.svg';
import successBadge from 'assets/ManagerMappingAndUnmappingAssets/UnMapScuccess.svg'; // Reuse or add your success icon
import remapIcon from 'assets/ManagerMappingAndUnmappingAssets/refresh-filled.svg'; // 👈 Add remap icon import (↻ symbol)

const EmployeeDetailsCard = ({ 
  employee, 
  hideHeader = false, 
  isUnmapped = false,
  comparisonData = null, // 👈 New: For old vs new comparison
  showComparison = false // 👈 New: Flag to show comparison layout
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const phoneNumber = employee?.emergencyContact?.phoneNumber || employee?.phoneNumber || "+91 9949522639";
  const email = employee?.emergencyContact?.email || employee?.email || "support@school.com";
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
    campus: { name: 'Name Of The Campus', address: 'Address...' },
    reportingManager: 'Vamsi Ramana',
    manager: 'Raja',
    project: 'IPL'
  };

  // 👈 If comparison mode, use new data for prominent sections
  const displayData = showComparison ? comparisonData.new : employeeData;

  return (
    <div className={`${styles.employeeDetailsCard} ${isUnmapped ? styles.successCardBorder : ''}`}>
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

      <div className={styles.campusDetailsWrapper}>
        {!isUnmapped ? (
          <>
            {showComparison ? (
              /* 👈 Comparison Mode: Old (faded) + New sections */
              <div className={styles.comparisonContainer}>
                {/* Previous Campus (Faded) */}
                <div className={`${styles.campusDetailsSection} ${styles.fadedSection} ${isCollapsed ? styles.campusDetailsSectionCollapsed : ''}`}>
                  <div className={styles.currentCampusSection}>
                    <div className={styles.campusLeft}>
                      <div className={styles.campusTopRow}>
                        <div className={styles.campusIcon}>
                          <img src={iconSvg} alt="Campus" />
                        </div>
                        <div className={styles.campusTitleRow}>
                          <div className={styles.campusLabel}>Previous Campus</div>
                          <div className={styles.campusName}>{comparisonData.old.campus?.name}</div>
                        </div>
                      </div>
                      <div className={`${styles.campusAddress} ${isCollapsed ? styles.campusAddressHidden : ''}`}>
                        {comparisonData.old.campus?.address}
                      </div>
                    </div>
                    {/* 👈 Simplified icons for faded section (no interactions) */}
                    <div className={styles.campusIcons}>
                      <div className={styles.iconCircle}><img src={callIcon} alt="Call" className={styles.iconImage} /></div>
                      <div className={styles.iconCircle}><img src={emailIcon} alt="Email" className={styles.iconImage} /></div>
                    </div>
                  </div>
                  {/* Reporting Manager (Old) */}
                  <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
                    <div className={styles.managerLeft}>
                      <span className={styles.managerLabel}>Reporting Manager: </span>
                      <span className={styles.managerName}>{comparisonData.old.reportingManager}</span>
                    </div>
                    <div className={styles.managerRight}><img src={callIcon} alt="Call" /></div>
                  </div>
                  
                  {/* Manager (Old) */}
                  <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
                    <div className={styles.managerLeft}>
                      <span className={styles.managerLabel}>Manager: </span>
                      <span className={styles.managerName}>{comparisonData.old.manager}</span>
                    </div>
                    <div className={styles.managerRight}><img src={callIcon} alt="Call" /></div>
                  </div>
                </div>

                {/* Remap Icon */}
                <div className={styles.remapIconContainer}>
                  <img src={remapIcon} alt="Remapped" className={styles.remapIcon} />
                </div>

                {/* Remapped Campus (Prominent) */}
                <div className={`${styles.campusDetailsSection} ${isCollapsed ? styles.campusDetailsSectionCollapsed : ''}`}>
                  <div className={styles.currentCampusSection}>
                    <div className={styles.campusLeft}>
                      <div className={styles.campusTopRow}>
                        <div className={styles.campusIcon}>
                          <img src={iconSvg} alt="Campus" />
                        </div>
                        <div className={styles.campusTitleRow}>
                          <div className={styles.campusLabel}>Remapped Campus</div>
                          <div className={styles.campusName}>{displayData.campus?.name}</div>
                        </div>
                      </div>
                      <div className={`${styles.campusAddress} ${isCollapsed ? styles.campusAddressHidden : ''}`}>
                        {displayData.campus?.address}
                      </div>
                    </div>
                    <div className={styles.campusIcons}>
                      <div className={styles.iconCircle}>
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
                                backgroundColor: "#FFF", // custom tooltip background
                                color: "#3425FF", // tooltip text color
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
                        <Tooltip title={email} arrow placement="top">
                          <img src={emailIcon} alt="Email" className={styles.iconImage} />
                        </Tooltip>
                      </div>
                      <div className={`${styles.iconCircle} ${styles.iconRemap}`} onClick={handleToggle}>
                        <img src={isCollapsed ? maximizeIcon : minMaxIcon} alt="Toggle" />
                      </div>
                    </div>
                  </div>
                  {/* Reporting Manager (New) */}
                  <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
                    <div className={styles.managerLeft}>
                      <span className={styles.managerLabel}>Reporting Manager: </span>
                      <span className={styles.managerName}>{displayData.reportingManager}</span>
                    </div>
                    <div className={styles.managerRight}><img src={callIcon} alt="Call" /></div>
                  </div>
                  
                  {/* Manager (New) */}
                  <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
                    <div className={styles.managerLeft}>
                      <span className={styles.managerLabel}>Manager: </span>
                      <span className={styles.managerName}>{displayData.manager}</span>
                    </div>
                    <div className={styles.managerRight}><img src={callIcon} alt="Call" /></div>
                  </div>
                </div>

                <div className={`${styles.bottomBar} ${isCollapsed ? styles.bottomBarHidden : ''}`}>
                  — {displayData.project} —
                </div>
              </div>
            ) : (
              /* 👈 Original Single Mode (no comparison) */
              <>
              <div className={`${styles.campusDetailsSection} ${isCollapsed ? styles.campusDetailsSectionCollapsed : ''}`}>
                <div className={styles.currentCampusSection}>
                  <div className={styles.campusLeft}>
                    <div className={styles.campusTopRow}>
                      <div className={styles.campusIcon}>
                        <img src={iconSvg} alt="Campus" />
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
                              backgroundColor: "#FFF", // custom tooltip background
                              color: "#3425FF", // tooltip text color
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
                      <Tooltip title={email} arrow placement="top">
                        <img src={emailIcon} alt="Email" className={styles.iconImage} />
                      </Tooltip>
                    </div>
                    <div className={`${styles.iconCircle} ${styles.iconRemap}`} onClick={handleToggle}>
                      <img src={isCollapsed ? maximizeIcon : minMaxIcon} alt="Toggle" />
                    </div>
                  </div>
                </div>
                {/* Reporting Manager Section */}
                <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
                  <div className={styles.managerLeft}>
                    <span className={styles.managerLabel}>Reporting Manager: </span>
                    <span className={styles.managerName}>{employeeData.reportingManager}</span>
                  </div>
                  <div className={styles.managerRight}><img src={callIcon} alt="Call" /></div>
                </div>
                
                {/* Manager Section */}
                <div className={`${styles.reportingManagerSection} ${isCollapsed ? styles.reportingManagerSectionHidden : ''}`}>
                  <div className={styles.managerLeft}>
                    <span className={styles.managerLabel}>Manager: </span>
                    <span className={styles.managerName}>{employeeData.manager}</span>
                  </div>
                  <div className={styles.managerRight}><img src={callIcon} alt="Call" /></div>
                </div>
              </div>
              <div className={`${styles.bottomBar} ${isCollapsed ? styles.bottomBarHidden : ''}`}>
                — {employeeData.project} —
              </div>
              </>
            )}
          </>
        ) : (
          /* Success UI State */
          <div className={styles.unmappedSuccessContainer}>
            <img src={successBadge} alt="Success" className={styles.successIcon} />
            <p className={styles.successText}>Unmapped Successful</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default EmployeeDetailsCard;