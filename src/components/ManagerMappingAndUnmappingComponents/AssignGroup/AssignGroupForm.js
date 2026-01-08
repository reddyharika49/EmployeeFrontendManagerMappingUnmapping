import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./AssignGroupForm.module.css";

import Dropdown from "widgets/Dropdown/Dropdown";
import Inputbox from "widgets/Inputbox/InputBox";
import Button from "widgets/Button/Button";

import iconSvg from "assets/ManagerMappingAndUnmappingAssets/icon.svg";
import rightArrowIcon from "assets/managermappingsearch/rightarrow.jsx";
import leftarrow from "assets/EmployeeOnBoarding/leftarrow";

import {
  getCities,
  getCampusesByLocation,
  getDepartments,
  getDesignationsByDepartment,
  getEmployeesByDepartmentAndCampus,
  mapEmployeeGroup
} from "api/managerMapping/managerMapping";

/* =========================
   HELPERS
========================= */
const getIdByName = (list, name) =>
  list.find(item => item.name === name)?.id;

const AssignGroupForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================
     ROUTE STATE (SOURCE OF TRUTH)
  ========================= */
  const payrollIds = location.state?.payrollIds || [];
  const selectedEmployees = location.state?.selectedEmployees || [];

  /* =========================
     FORM STATE
  ========================= */
  const [formData, setFormData] = useState({
    location: "",
    campus: "",
    department: "",
    position: "",
    manager: "",
    reportingManager: "",
    workingStartDate: "",
    remarks: ""
  });

  /* =========================
     DROPDOWN DATA
  ========================= */
  const [locations, setLocations] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [employees, setEmployees] = useState([]);

  /* =========================
     SELECTED CAMPUSES
  ========================= */
  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const [campusIdCounter, setCampusIdCounter] = useState(1);

  /* =========================
     INITIAL LOAD
  ========================= */
  useEffect(() => {
    const loadInitialData = async () => {
      const cityRes = await getCities();
      setLocations(cityRes || []);

      const deptRes = await getDepartments();
      setDepartments(deptRes || []);
    };

    loadInitialData();
  }, []);

  /* =========================
     INPUT HANDLER
  ========================= */
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    /* LOCATION → CAMPUSES */
    if (name === "location") {
      setFormData(prev => ({
        ...prev,
        campus: "",
        department: "",
        position: "",
        manager: "",
        reportingManager: ""
      }));

      setCampuses([]);
      setPositions([]);
      setEmployees([]);
      setSelectedCampuses([]);

      if (value) {
        const cityId = getIdByName(locations, value);
        if (!cityId) return;

        const campusRes = await getCampusesByLocation(cityId);
        setCampuses(campusRes || []);
      }
    }

    /* CAMPUS SELECTION (MULTI) */
    if (name === "campus" && value) {
      const exists = selectedCampuses.some(c => c.name === value);
      if (exists) return;

      const selectedCampus = campuses.find(c => c.name === value);
      if (!selectedCampus) return;

      setSelectedCampuses(prev => [
        ...prev,
        {
          id: campusIdCounter,
          campusId: selectedCampus.id,
          name: selectedCampus.name
        }
      ]);

      setCampusIdCounter(prev => prev + 1);

      if (formData.department) {
        const departmentId = getIdByName(departments, formData.department);
        await fetchEmployees(departmentId, selectedCampus.id);
      }
    }

    /* DEPARTMENT → DESIGNATIONS + EMPLOYEES */
    if (name === "department") {
      setPositions([]);
      setEmployees([]);

      if (value && selectedCampuses.length > 0) {
        const departmentId = getIdByName(departments, value);
        if (!departmentId) return;

        const desigRes = await getDesignationsByDepartment(departmentId);
        setPositions(desigRes || []);

        await fetchEmployees(departmentId, selectedCampuses[0].campusId);
      }
    }
  };

  /* =========================
     FETCH EMPLOYEES
  ========================= */
  const fetchEmployees = async (departmentId, campusId) => {
    if (!departmentId || !campusId) return;

    const empRes = await getEmployeesByDepartmentAndCampus(
      departmentId,
      campusId
    );

    setEmployees(
      (empRes || []).map(emp => ({
        id: emp.empId,
        name: emp.empName
      }))
    );
  };

  /* =========================
     REMOVE CAMPUS CHIP
  ========================= */
  const handleRemoveCampus = (id) => {
    setSelectedCampuses(prev =>
      prev.filter(campus => campus.id !== id)
    );
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.workingStartDate) {
      alert("Please select Working Start Date");
      return;
    }

    if (payrollIds.length === 0) {
      alert("No employees selected");
      return;
    }

    const workStartDate = new Date(formData.workingStartDate);
    if (isNaN(workStartDate.getTime())) {
      alert("Invalid Working Start Date");
      return;
    }

    const payload = {
      cityId: getIdByName(locations, formData.location),

      campusMappings: selectedCampuses.map(campus => ({
        campusId: campus.campusId,
        departmentId: getIdByName(departments, formData.department),
        subjectId: 0,
        designationId: getIdByName(positions, formData.position)
      })),

      payrollIds, // ✅ FROM ROUTE STATE

      managerId: getIdByName(employees, formData.manager),
      reportingManagerId: getIdByName(employees, formData.reportingManager),

      workStartingDate: workStartDate.toISOString(),
      remark: formData.remarks,
      updatedBy: 5212
    };

    console.log("✅ FINAL PAYLOAD", payload);

    try {
      await mapEmployeeGroup(payload);
      alert("Employees mapped successfully ✅");
      navigate(-1);
    } catch (err) {
      console.error("❌ Mapping failed", err);
      alert("Failed to map employees");
    }
  };

  const handleBack = () => navigate(-1);

  /* =========================
     FORM CONFIG
  ========================= */
  const formFields = [
    { type: "dropdown", name: "location", label: "Location", options: locations },
    { type: "dropdown", name: "campus", label: "Campus", options: campuses },
    { type: "dropdown", name: "department", label: "Department", options: departments },
    {
      type: "dropdown",
      name: "position",
      label: "Position / Designation",
      options: positions,
      disabled: !formData.department
    },
    { type: "dropdown", name: "manager", label: "Manager", options: employees },
    {
      type: "dropdown",
      name: "reportingManager",
      label: "Reporting Manager",
      options: employees
    },
    {
      type: "input",
      name: "workingStartDate",
      label: "Working Start Date",
      inputType: "date"
    }
  ];

  /* =========================
     RENDER
  ========================= */
  return (
    <div className={styles.assignGroupFormSection}>
      <h3 className={styles.assignGroupTitle}>Re-Mapping</h3>

      <form className={styles.assignGroupForm} onSubmit={handleSubmit}>
        <div className={styles.formFieldsGrid}>
          {formFields.map(field => (
            <div key={field.name} className={styles.formGroup}>
              {field.type === "dropdown" ? (
                <Dropdown
                  dropdownname={field.label}
                  results={field.options.map(o => o.name)}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  dropdownsearch
                  disabled={field.disabled}
                />
              ) : (
                <Inputbox
                  label={field.label}
                  name={field.name}
                  type={field.inputType}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}
        </div>

        {/* SELECTED CAMPUSES */}
        <div className={styles.selectedCampusesSection}>
          <label>Selected Campuses</label>

          <div className={styles.selectedCampusesList}>
            {selectedCampuses.length === 0 ? (
              <div className={styles.emptyCampusState}>
                <img src={iconSvg} alt="" />
                <p>You haven't selected any campus yet</p>
              </div>
            ) : (
              selectedCampuses.map(campus => (
                <div key={campus.id} className={styles.campusChip}>
                  <div>{campus.name}</div>
                  <button type="button" onClick={() => handleRemoveCampus(campus.id)}>
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* REMARKS */}
        <div className={styles.formGroup}>
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        {/* ACTIONS */}
        <div className={styles.formActions}>
          <Button
            buttonname="Back"
            type="button"
            variant="secondary"
            lefticon={leftarrow}
            onClick={handleBack}
            width="140px"
          />

          <Button
            buttonname="Re-Map"
            type="submit"
            variant="primary"
            righticon={rightArrowIcon}
            width="160px"
          />
        </div>
      </form>
    </div>
  );
};

export default AssignGroupForm;
