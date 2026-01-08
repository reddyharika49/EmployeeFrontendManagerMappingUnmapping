// components/ManagerMapping/EmployeeSearchResults.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EmployeeCard from 'widgets/Cards/EmployeeCard/EmployeeCardWithCheckBox';
import styles from "./EmployeeSearchResults.module.css";

import empprofile from 'assets/managermappingsearch/empprofile.svg';
import blueLine from 'assets/managermappingsearch/bluefilterline.svg';
import breadcrumarrow from 'assets/managermappingsearch/breadcrumarrow.svg';
import rightarrow from 'assets/managermappingsearch/rightarrow.jsx';
import Button from 'widgets/Button/Button';


import { advancedEmployeeSearch } from "api/managerMapping/managerMapping";

const EmployeeSearchResults = ({
  employees,
  setEmployees,
  selectedEmployees,
  setSelectedEmployees
}) => {
  const navigate = useNavigate();

  // const location = useLocation();
  const location = useLocation();
const preSelected = selectedEmployees || [];

useEffect(() => {
  if (preSelected.length > 0) {
    setSelectedEmployees(prev => {
      const merged = [...prev];
      preSelected.forEach(emp => {
        if (!merged.some(e => e.empId === emp.empId)) {
          merged.push(emp);
        }
      });
      return merged;
    });
  }
}, []);

  const { filters, payrollId ,searchMode} = location.state || {};

  const buildSearchParams = () => {
    const params = {};
  
    if (filters?.state?.stateId)
      params.stateId = filters.state.stateId;
  
    if (filters?.city?.cityId)
      params.cityId = filters.city.cityId;
  
    if (filters?.campus?.campusId)
      params.campusId = filters.campus.campusId;
  
    if (filters?.empType?.empTypeId)
      params.employeeTypeId = filters.empType.empTypeId;
  
    if (filters?.department?.departmentId)
      params.departmentId = filters.department.departmentId;
  
    if (payrollId && payrollId.trim() !== "")
      params.payrollId = payrollId.trim();
  
    return params;
  };
  
  // const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location.state) return; // just do nothing on refresh
  
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const params = buildSearchParams();
        const res = await advancedEmployeeSearch(params);
  
        setEmployees(prev => {
          if (searchMode === "PAYROLL") {
            if (!res || res.length === 0) return prev;
  
            const newEmp = res[0];
            const exists = prev.some(e => e.empId === newEmp.empId);
  
            return exists ? prev : [...prev, newEmp];
          }
  
          return res || [];
        });
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEmployees();
  }, [location.state]);
  
  
  // // SAMPLE DATA
  // const sampleEmployees = [
  //   { id: "HYD-001", name: "Devansh.N", dept: "IT Cell", level: "Level 4", status: "full time", image: empprofile },
  //   { id: "HYD-002", name: "Devansh.N", dept: "IT Cell", level: "Level 4", status: "Contract", image: empprofile },
  //   { id: "HYD-003", name: "Devansh.N", dept: "IT Cell", level: "Level 4", status: "Left", image: empprofile },
  //   { id: "HYD-004", name: "Devansh.N", dept: "IT Cell", level: "Level 4", status: "Full time", image: empprofile },
  //   { id: "HYD-005", name: "Devansh.N", dept: "IT Cell", level: "Level 4", status: "Contract", image: empprofile },
  // ];

  const handleSelect = (employee, checked) => {
    setSelectedEmployees(prev => {
      if (checked) {
        const exists = prev.some(e => e.empId === employee.empId);
        return exists ? prev : [...prev, employee];
      }
      return prev.filter(e => e.empId !== employee.empId);
    });
  };
        
  

  return (
    <div className={styles.search_wrapper}>
      {/* Top Row */}
      <div className={styles.topRow}>
        <h2 className={styles.title}>Search Results</h2>

        {selectedEmployees.length > 0 && (
          <p className={styles.selectedCount}>
            <span className={styles.countNumber}>{selectedEmployees.length}</span>
            <span className={styles.countLabel}> Selected</span>
          </p>
        )}
      </div>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <span>Hyderabad</span>
        <img src={breadcrumarrow} className={styles.bcIcon} alt="" />
        <span>BanjaraHills</span>
        <img src={breadcrumarrow} className={styles.bcIcon} alt="" />
        <span>Teaching</span>
      </div>

      {/* Card List */}
      <div className={styles.cardRow}>
        {employees.map((emp, idx) => (
          <EmployeeCard
            key={emp.empId}
            id={emp.payRollId}
            name={emp.empName}
            dept={emp.departmentName}
            level={emp.employeeTypeName}
            status={emp.modeOfHiringName}
            image={empprofile}
            styleImg={blueLine}
            isSelected={selectedEmployees.some(e => e.empId === emp.empId)}
            onSelect={(employee, checked) =>
              handleSelect(emp, checked)
            }
          />
        ))}
        {loading && <p>Loading employees...</p>}

        {!loading && employees.length === 0 && (
          <p>No employees found for selected criteria</p>
        )}

      </div>

 {/* Footer */}
<div className={styles.footer}>
  <div className={styles.footerActions}>
    <Button
      buttonname="Cancel"
      type="button"
      variant="secondary"
      width="108px"
      onClick={() => setSelectedEmployees([])}
    />

    <Button
      buttonname="Next"
      type="button"
      righticon={rightarrow}
      variant="primary"
      width="123px"
      onClick={() =>
        navigate("/scopes/employee/employeeManager/mapping-mode", {
          state: { selectedEmployees }
        })
      }
    />
  </div>
</div>
    </div>
  );
};

export default EmployeeSearchResults;