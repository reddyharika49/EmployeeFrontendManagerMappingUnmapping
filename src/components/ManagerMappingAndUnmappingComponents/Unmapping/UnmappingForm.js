import React, { useState, useEffect } from "react";
import styles from "../Remapping/RemappingForm.module.css";
import Inputbox from "widgets/Inputbox/InputBox";
import Button from "widgets/Button/Button";
import conformicon from "assets/ManagerMappingAndUnmappingAssets/conformicon";
import { unmapEmployee } from "api/managerMapping/managerMapping";

const UnmappingForm = ({ employee }) => {
  const [formData, setFormData] = useState({
    payrollId: "",
    cityId: null,
    managerId: null,
    reportingManagerId: null,
    campusIds: [],

    lastDate: "",
    remark: ""
  });

  const [loading, setLoading] = useState(false);

  /* 🔹 Auto-fill IDs */
  useEffect(() => {
    if (!employee) return;

    setFormData(prev => ({
      ...prev,
      payrollId: employee.id,
      cityId: employee.cityId || 322,
      managerId: employee.managerId,
      reportingManagerId: employee.reportingManagerId,
      campusIds: employee.campus?.id ? [employee.campus.id] : []

    }));
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!employee.campusId) {
      alert("Campus mapping not found. Please reselect employee.");
      return;
    }
  
    const payload = {
      payrollId: employee.id,
      cityId: employee.cityId,
      campusIds: [employee.campusId], // ✅ guaranteed non-null
      managerId: employee.managerId,
      reportingManagerId: employee.reportingManagerId,
      lastDate: new Date(formData.lastDate).toISOString(),
      remark: formData.remark,
      updatedBy: 1
    };
  
    await unmapEmployee(payload);
  };
  

  return (
    <div className={styles.remappingFormSection}>
      <h3 className={styles.remappingTitle}>Un-Mapping</h3>

      <form className={styles.remappingForm} onSubmit={handleSubmit}>
        <Inputbox
          label="To Date"
          name="lastDate"
          type="date"
          value={formData.lastDate}
          onChange={handleChange}
          required
        />

        <Inputbox label="Location" value={employee.city || "—"} disabled />
        <Inputbox label="Shared Campus" value={employee.campus?.name || "—"} disabled />
        <Inputbox label="Manager" value={employee.manager || "—"} disabled />
        <Inputbox
          label="Reporting Manager"
          value={employee.reportingManager || "—"}
          disabled
        />

        <div className={styles.formGroup}>
          <label>Remarks</label>
          <textarea
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            rows="3"
            placeholder="Enter remark"
          />
        </div>

        <div className={styles.formActions}>
          <Button
            buttonname={loading ? "Processing..." : "Confirm"}
            type="submit"
            variant="primary"
            disabled={loading}
            righticon={conformicon}
            width="142px"
          />
        </div>
      </form>
    </div>
  );
};

export default UnmappingForm;
