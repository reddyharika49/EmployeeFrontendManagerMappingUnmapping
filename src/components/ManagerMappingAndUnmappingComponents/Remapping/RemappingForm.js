import React, { useState, useEffect } from "react";
import styles from "./RemappingForm.module.css";
 
import Dropdown from "widgets/Dropdown/Dropdown";
import Inputbox from "widgets/Inputbox/InputBox";
import Button from "widgets/Button/Button";
 
import EmployeeDetailsCard from "../EmployeeDetailsCard/EmployeeDetailsCard";
import conformicon from "assets/ManagerMappingAndUnmappingAssets/conformicon";
 
import {
  getCities,
  getCampusesByLocation,
  getDepartments,
  getDesignationsByDepartment,
  getEmployeesByDepartmentAndCampus,
  mapEmployee
} from "api/managerMapping/managerMapping";
 
const RemappingForm = ({ employee }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [remappedData, setRemappedData] = useState(null);
 
  /* FORM STATE */
  const [formData, setFormData] = useState({
    location: "",
    campus: "",
    department: "",
    designation: "",
    reportingManager: null, // {id,name}
    manager: null,          // {id,name}
    workingStartDate: "",
    remarks: ""
  });
 
  /* OPTIONS */
  const [cities, setCities] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employees, setEmployees] = useState([]);
 
  const managers = employees;
  const reportingManagers = employees;
 
  /* PREFILL */
  useEffect(() => {
    if (employee) {
      setFormData(prev => ({
        ...prev,
        location: employee.locationName ?? "",
        campus: employee.campusName ?? "",
        department: employee.departmentName ?? "",
        designation: employee.designationName ?? "",
        workingStartDate: employee.workingStartDate ?? "",
        remarks: ""
      }));
    }
  }, [employee]);
 
  /* INITIAL LOAD */
  useEffect(() => {
    loadCities();
    loadDepartments();
  }, []);
 
  const loadCities = async () => {
    const res = await getCities();
    setCities((res || []).map(c => ({ label: c.name, value: c.id })));
  };
 
  const loadDepartments = async () => {
    const res = await getDepartments();
    setDepartments((res || []).map(d => ({ label: d.name, value: d.id })));
  };
 
  /* CASCADING */
  useEffect(() => {
    const city = cities.find(c => c.label === formData.location);
    if (city) loadCampuses(city.value);
    else setCampuses([]);
  }, [formData.location, cities]);
 
  useEffect(() => {
    const dep = departments.find(d => d.label === formData.department);
    if (dep) loadDesignations(dep.value);
    else setDesignations([]);
  }, [formData.department, departments]);
 
  useEffect(() => {
    const dep = departments.find(d => d.label === formData.department);
    const camp = campuses.find(c => c.label === formData.campus);
 
    if (dep && camp) {
      loadEmployees(dep.value, camp.value);
    } else {
      setEmployees([]);
      setFormData(prev => ({
        ...prev,
        manager: null,
        reportingManager: null
      }));
    }
  }, [formData.department, formData.campus, departments, campuses]);
 
  const loadCampuses = async (locationId) => {
    const res = await getCampusesByLocation(locationId);
    setCampuses((res || []).map(c => ({ label: c.name, value: c.id })));
  };
 
 
  const loadDesignations = async (departmentId) => {
    const res = await getDesignationsByDepartment(departmentId);
    setDesignations((res || []).map(d => ({ label: d.name, value: d.id })));
  };
 
  const loadEmployees = async (departmentId, campusId) => {
    const res = await getEmployeesByDepartmentAndCampus(departmentId, campusId);
 
    const formatted = (res || []).map(emp => ({
      label: emp.empName,
      value: { id: emp.empId, name: emp.empName }
    }));
 
    setEmployees(formatted);
  };
 
  /* HANDLE CHANGE */
  const handleInputChange = (e) => {
    // Dropdown sends { name, value }
    if (e?.name) {
      setFormData(prev => ({ ...prev, [e.name]: e.value }));
      return;
    }
 
    // Inputbox / textarea
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 
  /* SUBMIT: call map-employees API */
  const handleSubmit = async (e) => {
  e.preventDefault();
 
  const locationId = cities.find(c => c.label === formData.location)?.value ?? null;
  const campusId = campuses.find(c => c.label === formData.campus)?.value ?? null;
  const departmentId = departments.find(d => d.label === formData.department)?.value ?? null;
  const designationId = designations.find(d => d.label === formData.designation)?.value ?? null;
 
  const remappedEmployee = {
    ...employee,
    locationId,
    campusId,
    departmentId,
    designationId,
    managerId: formData.manager?.id ?? null,
    reportingManagerId: formData.reportingManager?.id ?? null,
    workingStartDate: formData.workingStartDate,
    remarks: formData.remarks
  };
 
  // Determine payroll id (support several possible keys)
  const payrollIdRaw = employee?.payRollId ?? employee?.payrollId ?? employee?.id ?? "";
  const payrollId = String(payrollIdRaw);
 
  // Build payload (adjust fields below if backend expects different names/types)
  const payload = {
    cityId: Number(locationId) || 0,
    campusMappings: [
      {
        campusId: Number(campusId) || 0,
        departmentId: Number(departmentId) || 0,
        subjectId: 0,
        designationId: Number(designationId) || 0
      }
    ],
    payrollId: payrollId,
    managerId: Number(formData.manager?.id) || 0,
    reportingManagerId: Number(formData.reportingManager?.id) || 0,
    workStartingDate: formData.workingStartDate ? new Date(formData.workingStartDate).toISOString() : null,
    remark: formData.remarks ?? "",
    updatedBy: 0
  };
 
  // Quick client-side validation: ensure campus & department ids exist
  const missing = [];
  if (!payload.cityId) missing.push("cityId");
  if (!payload.campusMappings[0].campusId) missing.push("campusId");
  if (!payload.campusMappings[0].departmentId) missing.push("departmentId");
  if (!payload.campusMappings[0].designationId) missing.push("designationId");
  if (!payload.payrollId) missing.push("payrollId");
 
  if (missing.length > 0) {
    console.warn("Not posting: missing required fields:", missing, "payload:", payload);
    alert("Please fill required fields before confirming: " + missing.join(", "));
    return;
  }
 
  try {
    console.debug("Posting payload to map-employees:", payload);
    const res = await mapEmployee(payload);
    console.log("mapEmployee response:", res);
 
    setRemappedData(remappedEmployee);
    setIsSubmitted(true);
  } catch (err) {
    // Log Axios details for backend error analysis
    console.error("Failed to map employee:", err);
    if (err?.response) {
      console.error("Server status:", err.response.status);
      console.error("Server response body:", err.response.data);
      alert("Server rejected request: " + JSON.stringify(err.response.data));
    } else {
      alert("Failed to map employee. See console for details.");
    }
  }
};
 
  /* RENDER */
  return (
    <div className={styles.remappingFormSection}>
      {!isSubmitted ? (
        <>
          <h3 className={styles.remappingTitle}>Re-Mapping</h3>
 
          <form className={styles.remappingForm} onSubmit={handleSubmit}>
            <Dropdown
              dropdownname="Location"
              results={cities.map(c => c.label)}
              value={formData.location}
              name="location"
              onChange={handleInputChange}
              dropdownsearch={true}
            />
 
            <Dropdown
              dropdownname="Campus"
              results={campuses.map(c => c.label)}
              value={formData.campus}
              name="campus"
              onChange={handleInputChange}
              dropdownsearch={true}
            />
 
            <Dropdown
              dropdownname="Department"
              results={departments.map(d => d.label)}
              value={formData.department}
              name="department"
              onChange={handleInputChange}
              dropdownsearch={true}
            />
 
            <Dropdown
              dropdownname="Designation"
              results={designations.map(d => d.label)}
              value={formData.designation}
              name="designation"
              onChange={handleInputChange}
              dropdownsearch={true}
            />
 
            <Dropdown
              dropdownname="Reporting Manager"
              results={reportingManagers.map(d => d.label)}
              value={formData.reportingManager}
              name="reportingManager"
              onChange={handleInputChange}
              dropdownsearch={true}
            />
 
            <Dropdown
              dropdownname="Manager"
              results={managers.map(d => d.label)}
              value={formData.manager}
              name="manager"
              onChange={handleInputChange}
              dropdownsearch={true}
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
              <textarea name="remarks" rows="4" value={formData.remarks} onChange={handleInputChange} />
            </div>
 
            <Button buttonname="Confirm" type="submit" variant="primary" righticon={conformicon} width="142px" />
          </form>
        </>
      ) : (
        remappedData && <EmployeeDetailsCard employee={remappedData} hideHeader />
      )}
    </div>
  );
};
 
export default RemappingForm;