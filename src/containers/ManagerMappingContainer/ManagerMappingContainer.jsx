// containers/EmployeeOnBoarding-container/EmployeeOnBoardingContainer.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate, Outlet } from "react-router-dom";

import EmployeeManagement from "../../components/EmployeeManagement/EmployeeManagement";
import MappingLandingPage from "../../components/EmployeeLandingPage/EmployeeLanding";
import EmployeeSearchResults from "../../components/ManagerMapping/EmployeeSearchResults";
import EmployeeModuleHeader from "../../components/ManagerMapping/ManagerMappingHeaderContainer";
import MappingMode from "../../components/ManagerMapping/MappingMode";

import ManagerMappingAndUnmappingLayout from "../ManagerMappingAndUnmappingContainer/Layout";

import styles from "./ManagerMappingContainer.module.css";
import topleftarrow from "assets/managermappingsearch/topleftarrow.svg";

/* =========================================================
   LAYOUT WITH HEADER + BACK BUTTON
========================================================= */
const EmployeeLayout = ({
  searchTerm,
  onSearchChange,
  selectedEmployees,
  setSelectedEmployees
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  let title = "Employee Module";
  let subtitle = "Access and manage comprehensive student details seamlessly.";

  if (pathname.includes("/employeeManager/manage")) {
    title = "Employee Management";
    subtitle =
      "Search here to Map/Re-Map or Un-Map employees from location, campus etc.";
  }

  const showBackButton =
    pathname.includes("/employeeManager/manage") ||
    pathname.includes("/employeeManager/search-results");

  return (
    <div className={`${styles.layout} ${showBackButton ? styles.withBackButton : ""}`}>
      {showBackButton && (
        <button
          className={styles.backButton}
          onClick={() => navigate("/scopes/employee/employeeManager/manage")}
        >
          <img src={topleftarrow} alt="Back Arrow" />
        </button>
      )}

      <EmployeeModuleHeader
        title={title}
        subtitle={subtitle}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />

      <Outlet />
    </div>
  );
};

/* =========================================================
   MAIN CONTAINER
========================================================= */
const ManagerMappingContainer = () => {
  const [sharedSearchTerm, setSharedSearchTerm] = useState("");

  // ⭐ survives navigation, resets on refresh
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  return (
    <Routes>
      {/* HEADER + CONTENT */}
      <Route
        path="/"
        element={
          <EmployeeLayout
            searchTerm={sharedSearchTerm}
            onSearchChange={setSharedSearchTerm}
            selectedEmployees={selectedEmployees}
            setSelectedEmployees={setSelectedEmployees}
          />
        }
      >
        <Route index element={<MappingLandingPage />} />

        <Route path="manage" element={<EmployeeManagement />} />

        <Route
          path="search-results"
          element={
            <EmployeeSearchResults
              employees={employees}
              setEmployees={setEmployees}
              selectedEmployees={selectedEmployees}
              setSelectedEmployees={setSelectedEmployees}
            />
          }
        />
      </Route>

      {/* NO HEADER — FULL PAGE FLOW */}
      <Route
        path="mapping-mode/*"
        element={<MappingMode selectedEmployees={selectedEmployees} />}
      />

      <Route
        path="assign-individual/*"
        element={<ManagerMappingAndUnmappingLayout />}
      />

      <Route
        path="unassign-individual/*"
        element={<ManagerMappingAndUnmappingLayout />}
      />
    </Routes>
  );
};

export default ManagerMappingContainer;
