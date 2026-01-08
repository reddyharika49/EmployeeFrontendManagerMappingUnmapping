import React, { useState, useEffect } from "react";
import styles from "../Remapping/MainContentGrid.module.css";

import EmployeeDetailsCard from "../EmployeeDetailsCard/EmployeeDetailsCard";
import AddEmployeeWidget from "widgets/ManagerMappingAndUnmappingWidgets/AddNewEmployee(Blank)/AddEmployeeWidget";
import UnmappingForm from "./UnmappingForm";
import AddNewEmployeePopup from "../AddNewEmployeePopup/AddNewEmployeePopup";

import backarrow from "assets/managermappingsearch/topleftarrow.svg";
import { useNavigate, useLocation } from "react-router-dom";

import { fetchBatchCampusAddresses } from "api/managerMapping/managerMapping";

/* 🔁 Merge selected card + API data (same pattern as Assign) */
const convertEmployeeToGridFormat = (emp, apiData = {}) => {
  return {
    id: emp.payRollId || emp.payrollId,

    name: emp.empName || "—",
    department: emp.departmentName || "—",
    level: emp.employeeTypeName || "—",
    type: emp.modeOfHiringName || "—",

    phoneNumber: apiData.employeeMobileNo || null,
    city: apiData.city || null,
    cityId:apiData.cityId ||null,
    email: emp.email || null,

    campus: {
      name: emp.campusName || "—",
      address: apiData.fullAddress || "—"
    },

    reportingManager: apiData.reportingManagerName || "—",
    managerId:apiData.managerId ||null,
    manager: apiData.managerName || "—",
    reportingManagerId:apiData.reportingManagerId ||null,

    project: emp.projectName || "—"
  };
};

const UnmappingContentGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => navigate(-1);

  const selectedEmployees = location.state?.selectedEmployees || [];

  const [employees, setEmployees] = useState([]);
  const [isAddEmployeePopupOpen, setIsAddEmployeePopupOpen] = useState(false);

  /* 🔹 Initial load – selected employees */
  useEffect(() => {
    if (selectedEmployees.length === 0) return;

    const payrollIds = selectedEmployees.map(emp => emp.payRollId);

    fetchBatchCampusAddresses(payrollIds)
      .then(res => {
        const apiResponse = res.data || [];

        const apiMap = {};
        apiResponse.forEach(item => {
          apiMap[item.payrollId] = item;
        });

        const mergedEmployees = selectedEmployees.map(emp =>
          convertEmployeeToGridFormat(emp, apiMap[emp.payRollId])
        );

        setEmployees(mergedEmployees);
      })
      // .catch(err => {
      //   console.error("Failed to fetch campus details", err);

      //   // fallback – show selected card data only
      //   const fallback = selectedEmployees.map(emp =>
      //     convertEmployeeToGridFormat(emp)
      //   );
      //   setEmployees(fallback);
      // });
  }, [selectedEmployees]);

  /* 🔹 Add employee popup */
  const handleAddEmployeeClick = () => {
    setIsAddEmployeePopupOpen(true);
  };

  /* 🔹 Add more employees (same API flow) */
  const handleAddEmployees = (newSelectedEmployees) => {
    const payrollIds = newSelectedEmployees.map(emp => emp.payRollId);

    fetchBatchCampusAddresses(payrollIds)
      .then(res => {
        const apiMap = {};
        res.data.forEach(item => {
          apiMap[item.payrollId] = item;
        });

        const formatted = newSelectedEmployees.map(emp =>
          convertEmployeeToGridFormat(emp, apiMap[emp.payRollId])
        );

        setEmployees(prev => [...prev, ...formatted]);
      })
      .catch(err => {
        console.error("Failed to fetch additional employees", err);

        const fallback = newSelectedEmployees.map(emp =>
          convertEmployeeToGridFormat(emp)
        );
        setEmployees(prev => [...prev, ...fallback]);
      });
  };

  return (
    <div className={styles.mainContentGrid}>
      {/* Header */}
      <div className={styles.topRow}>
        <img
          src={backarrow}
          alt="back"
          className={styles.backIcon}
          onClick={goBack}
        />
        <div className={styles.modeheader}>
          <h2 className={styles.title}>Unmap Employees</h2>
          <p className={styles.subtitle}>Unmap each of employees</p>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.employeeGrid}>
        {employees.map((employee, index) => (
          <div key={employee.id || index} className={styles.gridColumn}>
            <EmployeeDetailsCard employee={employee} />
            <UnmappingForm employee={employee} />
          </div>
        ))}

        <div className={styles.gridColumn}>
          <AddEmployeeWidget onClick={handleAddEmployeeClick} />
        </div>
      </div>

      {/* Popup */}
      <AddNewEmployeePopup
        isOpen={isAddEmployeePopupOpen}
        onClose={() => setIsAddEmployeePopupOpen(false)}
        onAddEmployees={handleAddEmployees}
      />
    </div>
  );
};

export default UnmappingContentGrid;
