import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EmployeeCard from "widgets/Cards/EmployeeCard/EmployeeCardWithCheckBox";
import AssignGroupForm from "../ManagerMappingAndUnmappingComponents/AssignGroup/AssignGroupForm";
import UnassignGroupForm from "../ManagerMappingAndUnmappingComponents/UnassignGroupForm/UnassignGroupForm";
import ManagerMappingSuccess from "../ManagerMapping/ManagerMappingSuccess"; // 👈 Added import for success component
import styles from "./MappingMode.module.css";
import empprofile from "assets/managermappingsearch/empprofile.svg";
import backarrow from "assets/managermappingsearch/topleftarrow.svg";
import unmapicon from "assets/managermappingsearch/unmapicon.svg";
import mapicon from "assets/managermappingsearch/mapicon.svg";
import plusicon from "assets/managermappingsearch/plusicon.svg";
import closeicon from "assets/managermappingsearch/closeicon.svg";
import groupicon from "assets/managermappingsearch/groupicon.svg";
import individulicon from "assets/managermappingsearch/individualicon.svg";
const MappingMode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  /* =========================
     ROUTE STATE
  ========================= */
  const selectedEmployees = location.state?.selectedEmployees || [];
  // Extract ONLY payrollIds (what backend needs)
  const payrollIds = selectedEmployees.map(emp => emp.payRollId);
  /* =========================
     MODE STATE
  ========================= */
  const [selectedMode, setSelectedMode] = useState(null);
  const isUnassignGroupRoute = location.pathname.includes("unassign-group");
  const isAssignGroupRoute =
    location.pathname.includes("assign-group") && !isUnassignGroupRoute;
  /* =========================
     SUCCESS STATE FOR ASSIGN GROUP
  ========================= */
  const [showAssignSuccess, setShowAssignSuccess] = useState(false); // 👈 Lifted success state to parent
  /* =========================
     SUCCESS STATE FOR UNASSIGN GROUP
  ========================= */
  const [showUnassignSuccess, setShowUnassignSuccess] = useState(false); // 👈 Lifted success state to parent
  /* =========================
     FLOATING PANEL POSITION
  ========================= */
  const mapCardRef = useRef(null);
  const unmapCardRef = useRef(null);
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });
  /* =========================
     DERIVED STATE
  ========================= */
  const employeeCount = selectedEmployees.length;
  const hasEmployees = employeeCount > 0;
  const isSingleEmployee = employeeCount === 1;
  const canShowPanel = employeeCount > 1;
  const isSuccessActive = (isAssignGroupRoute && showAssignSuccess) || (isUnassignGroupRoute && showUnassignSuccess);
  const displayTitle = isSuccessActive
    ? ""
    : "Select mode to manage";
  const displaySubtitle = isSuccessActive
    ? ""
    : "Choose Categories to Map or Unmap Employee";
  const showBackArrow = !isSuccessActive;
  /* =========================
     EFFECT: PANEL POSITION
  ========================= */
  useEffect(() => {
    if (!selectedMode || !canShowPanel) return;
    const card =
      selectedMode === "map" ? mapCardRef.current : unmapCardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      setPanelPos({
        top: rect.top + rect.height / 2 - 60,
        left: rect.right + 10
      });
    }
  }, [selectedMode, canShowPanel]);
  /* =========================
     HANDLERS
  ========================= */
  const goBack = () => navigate(-1);
  const handleClose = () => setSelectedMode(null);
  const handleAssignSuccess = () => setShowAssignSuccess(true); // 👈 Handler for success callback
  const handleUnassignSuccess = () => setShowUnassignSuccess(true); // 👈 Handler for success callback
  const handleMapCardClick = () => {
    if (!hasEmployees) return;
    if (isSingleEmployee) {
      navigate("/scopes/employee/employeeManager/assign-individual", {
        state: { selectedEmployees }
      });
    } else {
      setSelectedMode("map");
    }
  };
  const handleUnmapCardClick = () => {
    if (!hasEmployees) return;
    if (isSingleEmployee) {
      navigate("/scopes/employee/employeeManager/unassign-individual", {
        state: { selectedEmployees }
      });
    } else {
      setSelectedMode("unmap");
    }
  };
  /* =========================
     RENDER
  ========================= */
  return (
    <div className={styles.mainWrapper}>
      {/* Blur overlay */}
      {selectedMode && canShowPanel && !isAssignGroupRoute && !isUnassignGroupRoute && (
        <div className={styles.fullBlurOverlay} />
      )}
      <div className={styles.blurArea}>
        <div className={styles.wrapper}>
          {/* HEADER */}
          <div className={styles.topRow}>
            {showBackArrow && (
              <img
                src={backarrow}
                alt="back"
                className={styles.backIcon}
                onClick={goBack}
              />
            )}
            <div className={styles.modeheader}>
              <h2 className={styles.title}>{displayTitle}</h2>
              <p className={styles.subtitle}>{displaySubtitle}</p>
            </div>
          </div>
          {/* SELECTED EMPLOYEES - Conditionally hide on success */}
          {!isSuccessActive && (
            <div className={styles.cardRow}>
              {selectedEmployees.map((emp, idx) => (
                <EmployeeCard
                  key={emp.empId || idx}
                  id={emp.payRollId}
                  name={emp.empName}
                  dept={emp.departmentName}
                  level={emp.employeeTypeName}
                  status={emp.modeOfHiringName}
                  image={empprofile}
                  isSelected={true}
                />
              ))}
              <div
                className={styles.addMoreCard}
                onClick={() =>
                  navigate("/scopes/employee/employeeManager/search-results", {
                    state: { selectedEmployees }
                  })
                }
              >
                <img src={plusicon} alt="add" />
                <p>Add more Employees</p>
              </div>
            </div>
          )}
          {!isAssignGroupRoute && !isUnassignGroupRoute && (
            <h3 className={styles.sectionTitle}>Select Mode of Mapping</h3>
          )}
        </div>
      </div>
      {/* ROUTED FORMS */}
      {isAssignGroupRoute ? (
        <div className={styles.formContainer}>
          {showAssignSuccess ? (
            <ManagerMappingSuccess
              successTitle="Re-Mapping Successful" // 👈 Pass title
              onBack={() => {
                setShowAssignSuccess(false); // 👈 Reset state to show form again, or navigate(-1) if preferred
                // navigate(-1); // Alternative: go back to mode selection
              }}
              onContinue={() => navigate("/scopes/employee/employeeManager/manage")}
            />
          ) : (
            <AssignGroupForm onSuccess={handleAssignSuccess} />
          )}
        </div>
      ) : isUnassignGroupRoute ? (
        <div className={styles.formContainer}>
          {showUnassignSuccess ? (
            <ManagerMappingSuccess
              successTitle="Un-Mapping Successful" // 👈 Pass title
              onBack={() => {
                setShowUnassignSuccess(false); // 👈 Reset state to show form again, or navigate(-1) if preferred
                // navigate(-1); // Alternative: go back to mode selection
              }}
              onContinue={() => navigate("/scopes/employee/employeeManager/manage")}
            />
          ) : (
            <UnassignGroupForm onSuccess={handleUnassignSuccess} />
          )}
        </div>
      ) : (
        <div className={styles.modeContainer}>
          {/* MAP */}
          <div
            ref={mapCardRef}
            className={`${styles.modeCardOrange} ${
              selectedMode === "map"
                ? styles.cardSelected
                : selectedMode === "unmap"
                ? styles.blurredCard
                : ""
            } ${!hasEmployees ? styles.disabledCard : ""}`}
            onClick={handleMapCardClick}
          >
            <img src={mapicon} alt="map" className={styles.modeIcon} />
            <h4>Mapping / Remapping</h4>
            <p>Map manager, campus or change designation</p>
          </div>
          {/* UNMAP */}
          <div
            ref={unmapCardRef}
            className={`${styles.modeCardBlue} ${
              selectedMode === "unmap"
                ? styles.cardSelected
                : selectedMode === "map"
                ? styles.blurredCard
                : ""
            } ${!hasEmployees ? styles.disabledCard : ""}`}
            onClick={handleUnmapCardClick}
          >
            <img src={unmapicon} alt="unmap" className={styles.modeIcon} />
            <h4>Unmap</h4>
            <p>Unmap manager or campus</p>
          </div>
        </div>
      )}
      {/* FLOATING PANEL */}
      {selectedMode && canShowPanel && !isAssignGroupRoute && !isUnassignGroupRoute && (
        <div
          className={styles.floatingPanel}
          style={{ top: panelPos.top, left: panelPos.left }}
        >
          <div className={styles.closeCircle} onClick={handleClose}>
            <img src={closeicon} alt="close" />
          </div>
          <div className={styles.floatingOptions}>
            {selectedMode === "map" ? (
              <>
                <button
                  className={styles.pillBtn}
                  onClick={() =>
                    navigate(
                      "/scopes/employee/employeeManager/mapping-mode/assign-group",
                      {
                        state: {
                          selectedEmployees,
                          payrollIds
                        }
                      }
                    )
                  }
                >
                  <img src={groupicon} alt="" />
                  <span>Assign Group</span>
                </button>
                <button
                  className={styles.pillBtnAlt}
                  onClick={() =>
                    navigate("/scopes/employee/employeeManager/assign-individual", {
                      state: { selectedEmployees }
                    })
                  }
                >
                  <img src={individulicon} alt="" />
                  <span>Assign Individual</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.pillBtn}
                  onClick={() =>
                    navigate(
                      "/scopes/employee/employeeManager/mapping-mode/unassign-group",
                      {
                        state: {
                          selectedEmployees,
                          payrollIds
                        }
                      }
                    )
                  }
                >
                  <img src={groupicon} alt="" />
                  <span>UnAssign Group</span>
                </button>
                <button
                  className={styles.pillBtnAlt}
                  onClick={() =>
                    navigate("/scopes/employee/employeeManager/unassign-individual", {
                      state: { selectedEmployees }
                    })
                  }
                >
                  <img src={individulicon} alt="" />
                  <span>UnAssign Individual</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default MappingMode;