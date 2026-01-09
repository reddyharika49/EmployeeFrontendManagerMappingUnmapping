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
  getEmployeesByCampus,
  mapEmployeeGroup
} from "api/managerMapping/managerMapping";

/* =========================
   HELPERS
========================= */
const getIdByName = (list = [], name = "") =>
  list.find(item => item.name === name)?.id || 0;

const AssignGroupForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================
     ROUTE STATE
  ========================= */
  const payrollIds = location.state?.payrollIds || [];
  const selectedEmployees = location.state?.selectedEmployees || [];

  /* =========================
     ERROR STATE (NEW ✅)
  ========================= */
  const [error, setError] = useState("");

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
     MASTER DATA
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

  /* =========================
     INITIAL LOAD
  ========================= */
  useEffect(() => {
    const init = async () => {
      const cityRes = await getCities();
      const deptRes = await getDepartments();

      setLocations(cityRes || []);
      setDepartments(deptRes || []);
    };

    init();
  }, []);

  /* =========================
     VALIDATE SELECTED EMPLOYEES (NEW ✅)
  ========================= */
  useEffect(() => {
    if (!selectedEmployees.length) {
      setError("No employees selected");
      return;
    }

    const ref = selectedEmployees[0];

    const isSame = selectedEmployees.every(emp =>
      emp.locationName === ref.locationName &&
      emp.campusName === ref.campusName
    );

    if (!isSame) {
      setError(
        "Selected employees do not belong to the same Location / Campus"
      );
      return;
    }

    /* AUTO-POPULATE */
    setFormData(prev => ({
      ...prev,
      location: ref.locationName || "",
      campus: ref.campusName || ""
    }));

    setError("");
  }, [selectedEmployees]);

  /* =========================
     LOAD CAMPUSES
  ========================= */
  useEffect(() => {
    if (!formData.location || error) return;

    const cityId = getIdByName(locations, formData.location);
    if (!cityId) return;

    const loadCampuses = async () => {
      const res = await getCampusesByLocation(cityId);
      setCampuses(res || []);
    };

    loadCampuses();
  }, [formData.location, locations, error]);

  /* =========================
     FETCH EMPLOYEES BY CAMPUS
  ========================= */
  useEffect(() => {
    if (!formData.campus || !campuses.length || error) return;

    const campusId = getIdByName(campuses, formData.campus);
    if (!campusId) return;

    const loadEmployees = async () => {
      const res = await getEmployeesByCampus(campusId);
      setEmployees(res || []);
    };

    loadEmployees();

    setSelectedCampuses([
      { campusId, name: formData.campus }
    ]);
  }, [formData.campus, campuses, error]);

  /* =========================
     INPUT HANDLER
  ========================= */
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "department") {
      setPositions([]);

      if (!value) return;

      const deptId = getIdByName(departments, value);
      if (!deptId) return;

      const res = await getDesignationsByDepartment(deptId);
      setPositions(res || []);
    }
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;

    if (!formData.workingStartDate) {
      alert("Please select Working Start Date");
      return;
    }

    const payload = {
      cityId: getIdByName(locations, formData.location),

      campusMappings: selectedCampuses.map(c => ({
        campusId: c.campusId,
        departmentId: getIdByName(departments, formData.department),
        designationId: getIdByName(positions, formData.position),
        subjectId: 0
      })),

      payrollIds,
      managerId: getIdByName(employees, formData.manager),
      reportingManagerId: getIdByName(employees, formData.reportingManager),
      workStartingDate: new Date(formData.workingStartDate).toISOString(),
      remark: formData.remarks,
      updatedBy: 5212
    };

    try {
      await mapEmployeeGroup(payload);
      navigate(-1);
    } catch (err) {
      setError(err?.response?.data?.message || "Mapping failed");
    }
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <div className={styles.assignGroupFormSection}>
      <h3 className={styles.assignGroupTitle}>Re-Mapping</h3>

      {error && <p className={styles.errorText}>{error}</p>}

      <form className={styles.assignGroupForm} onSubmit={handleSubmit}>
        <div className={styles.formFieldsGrid}>
          <Dropdown
            dropdownname="Location"
            results={locations.map(l => l.name)}
            value={formData.location}
            disabled
          />

          <Dropdown
            dropdownname="Campus"
            results={campuses.map(c => c.name)}
            value={formData.campus}
            disabled
          />

          <Dropdown
            dropdownname="Department"
            results={departments.map(d => d.name)}
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            dropdownsearch
            disabled={!!error}
          />

          <Dropdown
            dropdownname="Position / Designation"
            results={positions.map(p => p.name)}
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            disabled={!formData.department || !!error}
          />

          <Dropdown
            dropdownname="Manager"
            results={employees.map(e => e.name)}
            name="manager"
            value={formData.manager}
            onChange={handleInputChange}
            dropdownsearch
            disabled={!!error}
          />

          <Dropdown
            dropdownname="Reporting Manager"
            results={employees.map(e => e.name)}
            name="reportingManager"
            value={formData.reportingManager}
            onChange={handleInputChange}
            dropdownsearch
            disabled={!!error}
          />

          <Inputbox
            label="Working Start Date"
            name="workingStartDate"
            type="date"
            value={formData.workingStartDate}
            onChange={handleInputChange}
            disabled={!!error}
          />
        </div>

        <div className={styles.selectedCampusesSection}>
          <label>Selected Campus</label>
          <div className={styles.selectedCampusesList}>
            {selectedCampuses.length === 0 ? (
              <div className={styles.emptyCampusState}>
                <img src={iconSvg} alt="" />
                <p>No campus selected</p>
              </div>
            ) : (
              selectedCampuses.map(c => (
                <div key={c.campusId} className={styles.campusChip}>
                  {c.name}
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            rows="4"
            disabled={!!error}
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
