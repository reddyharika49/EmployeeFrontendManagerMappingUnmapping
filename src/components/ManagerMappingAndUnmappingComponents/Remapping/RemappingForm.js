import React, { useState, useEffect } from "react";
import styles from "./RemappingForm.module.css";

import Dropdown from "widgets/Dropdown/Dropdown";
import Inputbox from "widgets/Inputbox/InputBox";
import Button from "widgets/Button/Button";

import EmployeeDetailsCard from "../EmployeeDetailsCard/EmployeeDetailsCard";
import conformicon from "assets/ManagerMappingAndUnmappingAssets/conformicon";

import {
  getDepartments,
  getDesignationsByDepartment,
  getEmployeesByCampus,
  mapEmployee
} from "api/managerMapping/managerMapping";

const RemappingForm = ({ employee }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [remappedData, setRemappedData] = useState(null);

  /* =========================
     FORM STATE
  ========================= */
  const [formData, setFormData] = useState({
    location: "",
    campus: "",
    department: "",
    designation: "",
    manager: null,
    reportingManager: null,
    workingStartDate: "",
    remarks: ""
  });

  /* =========================
     OPTIONS
  ========================= */
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employees, setEmployees] = useState([]);

  /* =========================
     AUTO POPULATE FROM PAYLOAD
  ========================= */
  useEffect(() => {
    if (!employee) return;

    setFormData(prev => ({
      ...prev,
      location: employee.city || "",
      campus: employee.campus?.name || "",
      department: employee.department || "",
      designation: employee.designation || "",
      workingStartDate: "",
      remarks: ""
    }));

    if (employee.campus?.id) {
      loadEmployees(employee.campus.id);
    }
    
  }, [employee]);

  /* =========================
     INITIAL LOAD
  ========================= */
  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const res = await getDepartments();
    setDepartments((res || []).map(d => ({ label: d.name, value: d.id })));
  };

  /* =========================
     DESIGNATION BY DEPARTMENT
  ========================= */
  useEffect(() => {
    const dept = departments.find(d => d.label === formData.department);
    if (dept) loadDesignations(dept.value);
    else setDesignations([]);
  }, [formData.department, departments]);

  const loadDesignations = async (departmentId) => {
    const res = await getDesignationsByDepartment(departmentId);
    setDesignations((res || []).map(d => ({ label: d.name, value: d.id })));
  };

  /* =========================
     FETCH EMPLOYEES BY CAMPUS ✅
  ========================= */
  const loadEmployees = async (campusId) => {
    if (!campusId) return;

    const res = await getEmployeesByCampus(campusId);

    setEmployees(
      (res || []).map(emp => ({
        label: emp.name,
        value: {
          id: emp.id,
          name: emp.name
        }
      }))
    );
  };

  /* =========================
     HANDLE INPUT
  ========================= */
  const handleInputChange = (e) => {
    if (e?.name) {
      setFormData(prev => ({ ...prev, [e.name]: e.value }));
      return;
    }

    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      cityId: employee.cityId,
      campusMappings: [
        {
          campusId: employee.campus.id,

          departmentId:
            departments.find(d => d.label === formData.department)?.value || 0,
          designationId:
            designations.find(d => d.label === formData.designation)?.value || 0,
          subjectId: 0
        }
      ],
      payrollId: String(employee.id),
      managerId: formData.manager?.id || 0,
      reportingManagerId: formData.reportingManager?.id || 0,
      workStartingDate: formData.workingStartDate
        ? new Date(formData.workingStartDate).toISOString()
        : null,
      remark: formData.remarks || "",
      updatedBy: 0
    };

    try {
      await mapEmployee(payload);
      setRemappedData({ ...employee, ...payload });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Mapping failed", err);
      alert("Failed to map employee");
    }
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <div className={styles.remappingFormSection}>
      {!isSubmitted ? (
        <>
          <h3 className={styles.remappingTitle}>Re-Mapping</h3>

          <form className={styles.remappingForm} onSubmit={handleSubmit}>
            <Dropdown
              dropdownname="Location"
              results={[formData.location]}
              value={formData.location}
              disabled
            />

            <Dropdown
              dropdownname="Campus"
              results={[formData.campus]}
              value={formData.campus}
              disabled
            />

            <Dropdown
              dropdownname="Department"
              results={departments.map(d => d.label)}
              value={formData.department}
              name="department"
              onChange={handleInputChange}
              dropdownsearch
            />

            <Dropdown
              dropdownname="Designation"
              results={designations.map(d => d.label)}
              value={formData.designation}
              name="designation"
              onChange={handleInputChange}
              dropdownsearch
            />

            <Dropdown
              dropdownname="Reporting Manager"
              results={employees.map(e => e.label)}
              value={formData.reportingManager}
              name="reportingManager"
              onChange={handleInputChange}
              dropdownsearch
            />

            <Dropdown
              dropdownname="Manager"
              results={employees.map(e => e.label)}
              value={formData.manager}
              name="manager"
              onChange={handleInputChange}
              dropdownsearch
            />

            <Inputbox
              label="Working Start Date"
              type="date"
              name="workingStartDate"
              value={formData.workingStartDate}
              onChange={handleInputChange}
            />

            <div className={styles.formGroup}>
              <label>Remarks</label>
              <textarea
                name="remarks"
                rows="4"
                value={formData.remarks}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formActions}>
              <Button
                buttonname="Confirm"
                type="submit"
                variant="primary"
                righticon={conformicon}
                width="142px"
              />
            </div>
          </form>
        </>
      ) : (
        remappedData && <EmployeeDetailsCard employee={remappedData} hideHeader />
      )}
    </div>
  );
};

export default RemappingForm;
