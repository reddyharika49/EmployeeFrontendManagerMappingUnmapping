import React, { useState, useEffect } from "react";
import styles from "./RemappingForm.module.css";

import Dropdown from "widgets/Dropdown/Dropdown";
import Inputbox from "widgets/Inputbox/InputBox";
import Button from "widgets/Button/Button";

import EmployeeDetailsCard from "../EmployeeDetailsCard/EmployeeDetailsCard";

import campusicon from "assets/ManagerMappingAndUnmappingAssets/campusicon.svg";
import conformicon from "assets/ManagerMappingAndUnmappingAssets/conformicon";

import {
  getCities,
  getCampusesByLocation,
  getDepartments,
  getDesignationsByDepartment
} from "api/managerMapping/managerMapping";

const RemappingForm = ({ employee }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [remappedData, setRemappedData] = useState(null);

  /* =========================
     FORM STATE
  ========================= */
  const [formData, setFormData] = useState({
    location: null,
    campus: null,
    department: null,
    designation: null,
    reportingManager: "",
    manager: "",
    workingStartDate: "",
    remarks: ""
  });

  /* =========================
     DROPDOWN OPTIONS (label/value)
  ========================= */
  const [cities, setCities] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  /* =========================
     STATIC OPTIONS
  ========================= */
  const reportingManagers = [
    { label: "Venkat", value: "Venkat" },
    { label: "Vamsi Ramana", value: "Vamsi Ramana" },
    { label: "Raja", value: "Raja" }
  ];

  const managers = [
    { label: "Raja", value: "Raja" },
    { label: "Venkat", value: "Venkat" },
    { label: "Kavitha Rao", value: "Kavitha Rao" }
  ];

  /* =========================
     PREFILL EMPLOYEE DATA
  ========================= */
  useEffect(() => {
    if (employee) {
      setFormData({
        location: employee?.locationId ?? null,
        campus: employee?.campusId ?? null,
        department: employee?.departmentId ?? null,
        designation: employee?.designationId ?? null,
        reportingManager: employee?.reportingManager ?? "",
        manager: employee?.manager ?? "",
        workingStartDate: employee?.workingStartDate ?? "",
        remarks: ""
      });
    }
  }, [employee]);

  /* =========================
     INITIAL LOAD
  ========================= */
  useEffect(() => {
    loadCities();
    loadDepartments();
  }, []);

  const loadCities = async () => {
    const res = await getCities();
    console.log(res);
    const formatted = (res || []).map(city => ({
      label: city.cityName,
      value: city.cityId
    }));
    setCities(formatted);
  };

  const loadDepartments = async () => {
    const res = await getDepartments();
    const formatted = (res || []).map(dep => ({
      label: dep.name,
      value: dep.id
    }));
    setDepartments(formatted);
  };

  /* =========================
     CASCADING DROPDOWNS
  ========================= */
  useEffect(() => {
    if (formData.location) {
      loadCampuses(formData.location);
    } else {
      setCampuses([]);
      setFormData(prev => ({ ...prev, campus: null }));
    }
  }, [formData.location]);

  useEffect(() => {
    if (formData.department) {
      loadDesignations(formData.department);
    } else {
      setDesignations([]);
      setFormData(prev => ({ ...prev, designation: null }));
    }
  }, [formData.department]);

  const loadCampuses = async (locationId) => {
    const res = await getCampusesByLocation(locationId);
    const formatted = (res || []).map(campus => ({
      label: campus.campusName,
      value: campus.campusId
    }));
    setCampuses(formatted);
  };

  const loadDesignations = async (departmentId) => {
    const res = await getDesignationsByDepartment(departmentId);
    const formatted = (res || []).map(des => ({
      label: des.designationName,
      value: des.designationId
    }));
    setDesignations(formatted);
  };

  /* =========================
     HANDLE CHANGE (SAFE)
  ========================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value?.value ?? value
    }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const remappedEmployee = {
      ...employee,
      locationId: formData.location,
      campusId: formData.campus,
      departmentId: formData.department,
      designationId: formData.designation,
      reportingManager: formData.reportingManager,
      manager: formData.manager,
      workingStartDate: formData.workingStartDate,
      remarks: formData.remarks
    };

    setRemappedData(remappedEmployee);
    setIsSubmitted(true);
  };

  /* =========================
     FORM CONFIG
  ========================= */
  const formFields = [
    {
      type: "dropdown",
      name: "location",
      label: "Location",
      options: cities,
      value: formData.location
    },
    {
      type: "dropdown",
      name: "campus",
      label: "Campus",
      options: campuses,
      value: formData.campus
    },
    {
      type: "dropdown",
      name: "department",
      label: "Department",
      options: departments,
      value: formData.department
    },
    {
      type: "dropdown",
      name: "designation",
      label: "Designation",
      options: designations,
      value: formData.designation
    },
    {
      type: "dropdown",
      name: "reportingManager",
      label: "Reporting Manager",
      options: reportingManagers,
      value: formData.reportingManager
    },
    {
      type: "dropdown",
      name: "manager",
      label: "Manager",
      options: managers,
      value: formData.manager
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
    <div className={styles.remappingFormSection}>
      {!isSubmitted ? (
        <>
          <h3 className={styles.remappingTitle}>Re-Mapping</h3>

          <form className={styles.remappingForm} onSubmit={handleSubmit}>
            {formFields.map(field => (
              <div key={field.name} className={styles.formGroup}>
                {field.type === "dropdown" ? (
                  <Dropdown
                    dropdownname={field.label}
                    
                    results={field.options}
                    value={field.value}
                    name={field.name}
                    onChange={handleInputChange}
                    dropdownsearch={false}
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

            <div className={styles.formGroup}>
              <label>Remarks</label>
              <textarea
                name="remarks"
                rows="4"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Enter remarks"
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
        remappedData && (
          <EmployeeDetailsCard employee={remappedData} hideHeader />
        )
      )}
    </div>
  );
};

export default RemappingForm;