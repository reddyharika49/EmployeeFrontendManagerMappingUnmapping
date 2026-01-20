import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./AssignGroupForm.module.css";

import Dropdown from "widgets/Dropdown/Dropdown";
import Inputbox from "widgets/Inputbox/InputBox";
import Button from "widgets/Button/Button";

// import iconSvg from "assets/ManagerMappingAndUnmappingAssets/.svg";
import rightArrowIcon from "assets/managermappingsearch/rightarrow.jsx";
import leftarrow from "assets/EmployeeOnBoarding/leftarrow";
import dividerLine from "assets/EmployeeOnBoarding/dividerline.svg";

import {
  getDepartments,
  getDesignationsByDepartment,
  getEmployeesByCampus,
  mapEmployeeGroup
} from "api/managerMapping/managerMapping";

const AssignGroupForm = ({ onSuccess }) => { // 👈 Added onSuccess prop from parent
  const navigate = useNavigate();
  const route = useLocation();

  /* =========================
     ROUTE STATE
  ========================= */
  const payrollIds = route.state?.payrollIds || [];
  const selectedEmployees = route.state?.selectedEmployees || [];

  /* =========================
     ERROR STATE
  ========================= */
  const [error, setError] = useState("");

  /* =========================
     FORM STATE (IDS ONLY)
  ========================= */
  const [formData, setFormData] = useState({
    cityId: null,
    cityName: "",
    campusId: null,
    campusName: "",
    departmentId: null,
    designationId: null,
    managerId: null,
    reportingManagerId: null,
    workingStartDate: "",
    remarks: ""
  });

  /* =========================
     MASTER DATA
  ========================= */
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employees, setEmployees] = useState([]);

  /* =========================
     INITIAL LOAD
  ========================= */
  useEffect(() => {
    getDepartments().then(res => setDepartments(res || []));
  }, []);

  /* =========================
     AUTO POPULATE CITY & CAMPUS
  ========================= */
  useEffect(() => {
    if (!selectedEmployees.length) {
      setError("No employees selected");
      return;
    }

    const ref = selectedEmployees[0];

    const isSame = selectedEmployees.every(emp =>
      emp.cityId === ref.cityId && emp.campusId === ref.campusId
    );

    if (!isSame) {
      setError("Selected employees must belong to same Location / Campus");
      return;
    }

    setFormData(prev => ({
      ...prev,
      cityId: ref.cityId,
      cityName: ref.cityName,
      campusId: ref.campusId,
      campusName: ref.campusName
    }));

    setError("");
  }, [selectedEmployees]);

  /* =========================
     FETCH EMPLOYEES BY CAMPUS
  ========================= */
  useEffect(() => {
    if (!formData.campusId) return;

    getEmployeesByCampus(formData.campusId)
      .then(res => setEmployees(res || []));
  }, [formData.campusId]);

  /* =========================
     HANDLERS
  ========================= */
  const onDepartmentChange = async (e) => {
    const dept = departments.find(d => d.name === e.target.value);
    if (!dept) return;

    setFormData(prev => ({
      ...prev,
      departmentId: dept.id,
      designationId: null
    }));

    const res = await getDesignationsByDepartment(dept.id);
    setDesignations(res || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;

    if (!formData.workingStartDate) {
      alert("Please select Working Start Date");
      return;
    }

    const payload = {
      cityId: formData.cityId,
      payrollIds,
      campusMappings: [
        {
          campusId: formData.campusId,
          departmentId: formData.departmentId,
          designationId: formData.designationId,
          subjectId: 0
        }
      ],
      managerId: formData.managerId,
      reportingManagerId: formData.reportingManagerId,
      workStartingDate: new Date(formData.workingStartDate).toISOString(),
      remark: formData.remarks,
      updatedBy: 5212
    };

    try {
      await mapEmployeeGroup(payload);
      if (onSuccess) onSuccess(); // 👈 Call parent callback on success instead of local state
    } catch (err) {
      setError(err?.response?.data?.message || "Mapping failed");
    }
  };

  /* =========================
     RENDER - Always render form (success handled in parent)
  ========================= */
  return (
    <div className={styles.assignGroupFormSection}>
      <div className={styles.header}>
      <h3 className={styles.assignGroupTitle}>Re-Mapping</h3>
      <img
              src={dividerLine}
              alt="divider"
              className={styles.dividerImage}
            />
            </div>

      {error && <p className={styles.errorText}>{error}</p>}

      <form className={styles.assignGroupForm} onSubmit={handleSubmit}>
        <div className={styles.formFieldsGrid}>

          {/* Location (City) */}
          <Inputbox
            label="Location"
            value={formData.cityName}
            disabled
          />

          {/* Campus */}
          <Inputbox
            label="Campus"
            value={formData.campusName}
            disabled
          />

          {/* Department */}
          <Dropdown
            dropdownname="Department"
            results={departments.map(d => d.name)}
            value={
              departments.find(d => d.id === formData.departmentId)?.name || ""
            }
            onChange={onDepartmentChange}
            dropdownsearch
            disabled={!!error}
          />

          {/* Designation */}
          <Dropdown
            dropdownname="Designation"
            results={designations.map(d => d.name)}
            value={
              designations.find(d => d.id === formData.designationId)?.name || ""
            }
            onChange={(e) => {
              const des = designations.find(d => d.name === e.target.value);
              setFormData(prev => ({
                ...prev,
                designationId: des?.id || null
              }));
            }}
            disabled={!formData.departmentId || !!error}
          />

          {/* Manager */}
          <Dropdown
            dropdownname="Manager"
            results={employees.map(e => e.name)}
            value={
              employees.find(e => e.id === formData.managerId)?.name || ""
            }
            onChange={(e) => {
              const emp = employees.find(x => x.name === e.target.value);
              setFormData(prev => ({
                ...prev,
                managerId: emp?.id || null
              }));
            }}
            dropdownsearch
            disabled={!!error}
          />

          {/* Reporting Manager */}
          <Dropdown
            dropdownname="Reporting Manager"
            results={employees.map(e => e.name)}
            value={
              employees.find(e => e.id === formData.reportingManagerId)?.name || ""
            }
            onChange={(e) => {
              const emp = employees.find(x => x.name === e.target.value);
              setFormData(prev => ({
                ...prev,
                reportingManagerId: emp?.id || null
              }));
            }}
            dropdownsearch
            disabled={!!error}
          />

          <Inputbox
            label="Working Start Date"
            type="date"
            value={formData.workingStartDate}
            onChange={(e) =>
              setFormData(prev => ({
                ...prev,
                workingStartDate: e.target.value
              }))
            }
            disabled={!!error}
          />
        </div>

        {/* <div className={styles.selectedCampusesSection}>
          <label>Selected Campus</label>
          <div className={styles.selectedCampusesList}>
            <div className={styles.campusChip}>
              {formData.campusName || "—"}
            </div>
          </div>
        </div> */}

        <div className={styles.formGroup}>
          <label>Remarks</label>
          <textarea
            rows="4"
            value={formData.remarks}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, remarks: e.target.value }))
            }
          />
        </div>

        <div className={styles.formActions}>
          <Button
            buttonname="Back"
            type="button"
            variant="secondary"
            lefticon={leftarrow}
            onClick={() => navigate(-1)}
            width="140px"
          />

          <Button
            buttonname="Re-Map"
            type="submit"
            variant="primary"
            righticon={rightArrowIcon}
            width="160px"
            disabled={!!error}
          />
        </div>
      </form>
    </div>
  );
};

export default AssignGroupForm;