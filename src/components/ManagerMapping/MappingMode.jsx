// components/ManagerMapping/MappingMode.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EmployeeCard from "widgets/Cards/EmployeeCard/EmployeeCardWithCheckBox";

import AssignGroupForm from "../ManagerMappingAndUnmappingComponents/AssignGroup/AssignGroupForm";
import UnassignGroupForm from "../ManagerMappingAndUnmappingComponents/UnassignGroupForm/UnassignGroupForm";

import styles from "./MappingMode.module.css";

import empprofile from 'assets/managermappingsearch/empprofile.svg';
import backarrow from 'assets/managermappingsearch/topleftarrow.svg';
import unmapicon from 'assets/managermappingsearch/unmapicon.svg';
import mapicon from 'assets/managermappingsearch/mapicon.svg';
import plusicon from 'assets/managermappingsearch/plusicon.svg';
import closeicon from 'assets/managermappingsearch/closeicon.svg';
import groupicon from 'assets/managermappingsearch/groupicon.svg';
import individulicon from 'assets/managermappingsearch/individualicon.svg';

const MappingMode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedEmployees = location.state?.selectedEmployees || [];
  const [selectedMode, setSelectedMode] = useState(null);

  const isUnassignGroupRoute = location.pathname.includes('unassign-group');
  const isAssignGroupRoute = location.pathname.includes('assign-group') && !isUnassignGroupRoute;

  const mapCardRef = useRef(null);
  const unmapCardRef = useRef(null);
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });

  const goBack = () => navigate(-1);
  const handleClose = () => setSelectedMode(null);

  // Selection state
  const employeeCount = selectedEmployees.length;
  const hasEmployees = employeeCount > 0;
  const isSingleEmployee = employeeCount === 1;
  const canShowPanel = employeeCount > 1; // Only show floating panel for multiple

  useEffect(() => {
    if (!selectedMode || !canShowPanel) return;

    const card = selectedMode === "map" ? mapCardRef.current : unmapCardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      setPanelPos({
        top: rect.top + rect.height / 2 - 60,
        left: rect.right + 10,
      });
    }
  }, [selectedMode, canShowPanel]);

  // Handle clicks on Map/Unmap cards
  const handleMapCardClick = () => {
    if (!hasEmployees) return; // disabled

    if (isSingleEmployee) {
      // Directly go to Assign Individual
      navigate("/scopes/employee/employeeManager/assign-individual", {
        state: { selectedEmployees }
      });
    } else {
      // Multiple → open panel
      setSelectedMode("map");
    }
  };

  const handleUnmapCardClick = () => {
    if (!hasEmployees) return; // disabled

    if (isSingleEmployee) {
      // Directly go to Unassign Individual
      navigate("/scopes/employee/employeeManager/unassign-individual", {
        state: { selectedEmployees }
      });
    } else {
      // Multiple → open panel
      setSelectedMode("unmap");
    }
  };
  

  return (
    <div className={styles.mainWrapper}>
      {/* Blur overlay only for multiple selection panel */}
      {selectedMode && canShowPanel && !isAssignGroupRoute && !isUnassignGroupRoute && (
        <div className={styles.fullBlurOverlay}></div>
      )}

      <div className={styles.blurArea}>
        <div className={styles.wrapper}>
          <div className={styles.topRow}>
            <img src={backarrow} alt="back" className={styles.backIcon} onClick={goBack} />
            <div className={styles.modeheader}>
              <h2 className={styles.title}>Select mode to manage</h2>
              <p className={styles.subtitle}>Choose Categories to Map or Unmap Employee</p>
            </div>
          </div>

          {/* Always show selected employees + Add more */}
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

          {!isAssignGroupRoute && !isUnassignGroupRoute && (
            <h3 className={styles.sectionTitle}>Select Mode of Mapping</h3>
          )}
        </div>
      </div>

      {/* Forms or Mode Cards */}
      {isAssignGroupRoute ? (
        <div className={styles.formContainer}>
          <AssignGroupForm />
        </div>
      ) : isUnassignGroupRoute ? (
        <div className={styles.formContainer}>
          <UnassignGroupForm />
        </div>
      ) : (
        <div className={styles.modeContainer}>
          {/* MAP CARD */}
          <div
            ref={mapCardRef}
            className={`${styles.modeCardOrange} ${
              selectedMode === "map" ? styles.cardSelected :
              selectedMode === "unmap" ? styles.blurredCard : ""
            } ${!hasEmployees ? styles.disabledCard : ""}`}
            onClick={handleMapCardClick}
            style={{
              pointerEvents: hasEmployees ? "auto" : "none",
              cursor: hasEmployees ? "pointer" : "default",
            }}
          >
            <img src={mapicon} alt="map" className={styles.modeIcon} style={!hasEmployees ? { opacity: 0.5 } : {}} />
            <h4 style={!hasEmployees ? { opacity: 0.6 } : {}}>Mapping/Remapping</h4>
            <p style={!hasEmployees ? { opacity: 0.5 } : {}}>
              Map manager, campus or remap, change designation here
            </p>
          </div>

          {/* UNMAP CARD */}
          <div
            ref={unmapCardRef}
            className={`${styles.modeCardBlue} ${
              selectedMode === "unmap" ? styles.cardSelected :
              selectedMode === "map" ? styles.blurredCard : ""
            } ${!hasEmployees ? styles.disabledCard : ""}`}
            onClick={handleUnmapCardClick}
            style={{
              pointerEvents: hasEmployees ? "auto" : "none",
              cursor: hasEmployees ? "pointer" : "default",
            }}
          >
            <img src={unmapicon} alt="unmap" className={styles.modeIcon} style={!hasEmployees ? { opacity: 0.5 } : {}} />
            <h4 style={!hasEmployees ? { opacity: 0.6 } : {}}>Unmap</h4>
            <p style={!hasEmployees ? { opacity: 0.5 } : {}}>
              Unmap manager, campus here
            </p>
          </div>
        </div>
      )}

      {/* Floating Panel - ONLY for multiple employees */}
      {selectedMode && canShowPanel && !isAssignGroupRoute && !isUnassignGroupRoute && (
        <div className={styles.floatingPanel} style={{ top: `${panelPos.top}px`, left: `${panelPos.left}px` }}>
          <div className={styles.closeCircle} onClick={handleClose}>
            <img src={closeicon} alt="close" className={styles.closeIcon} />
          </div>

          <div className={styles.floatingOptions}>
            {selectedMode === "map" ? (
              <>
                <button
                  className={styles.pillBtn}
                  onClick={() => navigate("/scopes/employee/employeeManager/mapping-mode/assign-group")}
                >
                  <img src={groupicon} className={styles.pillIcon} alt="" />
                  <span>Assign Group</span>
                </button>

                <button
                  className={styles.pillBtnAlt}
                  onClick={() => navigate("/scopes/employee/employeeManager/assign-individual", {
                    state: { selectedEmployees }
                  })}
                >
                  <img src={individulicon} className={styles.pillIcon} alt="" />
                  <span>Assign Individual</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.pillBtn}
                  onClick={() => navigate("/scopes/employee/employeeManager/mapping-mode/unassign-group")}
                >
                  <img src={groupicon} className={styles.pillIcon} alt="" />
                  <span>UnAssign Group</span>
                </button>

                <button
                  className={styles.pillBtnAlt}
                  onClick={() => navigate("/scopes/employee/employeeManager/unassign-individual", {
                    state: { selectedEmployees }
                  })}
                >
                  <img src={individulicon} className={styles.pillIcon} alt="" />
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