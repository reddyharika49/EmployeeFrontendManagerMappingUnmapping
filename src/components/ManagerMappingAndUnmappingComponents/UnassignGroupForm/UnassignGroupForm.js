



import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./UnassignGroupForm.module.css";

import Inputbox from "widgets/Inputbox/InputBox";
import Button from "widgets/Button/Button";

import rightArrowIcon from "assets/managermappingsearch/rightarrow.jsx";
import leftarrow from "assets/EmployeeOnBoarding/leftarrow";

import {
  fetchBatchCampusAddresses,
  unmapMultipleEmployees
} from "api/managerMapping/managerMapping";

const UnassignGroupForm = () => {

  // const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /* 🔹 Payroll IDs from previous screen */
  const payrollIds = location.state?.payrollIds || [];
  console.log("Received payrollIds:", payrollIds);

  /* 🔹 UI data (DO NOT change UI structure) */
  const [formData, setFormData] = useState({
    toDate: "",
    location: "",
    campusName: "",
    manager: "",
    reportingManager: "",
    remarks: ""
  });

  /* 🔹 Backend IDs */
  const [ids, setIds] = useState({
    cityId: null,
    campusId: null,
    managerId: null,
    reportingManagerId: null
  });

  const [error, setError] = useState("");

  /* 🔹 Fetch & auto-populate */
  useEffect(() => {
    if (!payrollIds || payrollIds.length === 0) {
      setError("No employees selected");
      return;
    }

    fetchBatchDetails();
  }, [payrollIds]);

  const fetchBatchDetails = async () => {
    try {
      const { data } = await fetchBatchCampusAddresses(payrollIds);

      console.log("API response:", data);

      if (!data || data.length === 0) {
        setError("No mapping details found");
        return;
      }

      const ref = data[0];

      /* 🔹 Validate same mapping */
      const isSame = data.every(item =>
        item.campusId === ref.campusId &&
        item.managerId === ref.managerId &&
        item.reportingManagerId === ref.reportingManagerId &&
        item.cityId === ref.cityId
      );

      if (!isSame) {
        setError(
          "Selected employees do not belong to the same Location / Campus / Manager"
        );
        return;
      }

      /* 🔹 Store IDs for submit */
      setIds({
        cityId: ref.cityId,
        campusId: ref.campusId,
        managerId: ref.managerId,
        reportingManagerId: ref.reportingManagerId
      });

      /* 🔹 Auto-populate UI fields */
      setFormData(prev => ({
        ...prev,
        location: ref.city || "",
        campusName: ref.fullAddress || "",
        manager: ref.managerName || "",
        reportingManager: ref.reportingManagerName || ""
      }));

      setError("");
    } catch (err) {
      console.error("Fetch failed:", err);
      setError(err?.response?.data?.message || "Failed to fetch details");
    }
  };

  /* 🔹 Handlers */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;

    const payload = {
      cityId: ids.cityId,
      campusIds: [ids.campusId],  
      payrollId: payrollIds[0], 
        // ARRAY ✅
      payrollIds: payrollIds,             // ✅ FIXED (plural + array)
      managerId: ids.managerId,
      reportingManagerId: ids.reportingManagerId,
      lastDate: new Date(formData.toDate).toISOString(),
      remark: formData.remarks,            // matches backend
      updatedBy: 1
    };

    console.log("🚀 Unmap payload:", payload);

    try {
      await unmapMultipleEmployees(payload);
     navigate(-1);
    } catch (err) {
      console.error("Unmap failed:", err);
      setError(err?.response?.data?.message || "Failed to unmap employees");
    }
  };


  return (
    <div className={styles.unassignGroupFormSection}>
      <h3 className={styles.unassignGroupTitle}>Un-Mapping</h3>

      {error && <p className={styles.errorText}>{error}</p>}

      <form className={styles.unassignGroupForm} onSubmit={handleSubmit}>
        <Inputbox
          label="To Date"
          name="toDate"
          type="date"
          value={formData.toDate}
          onChange={handleChange}
          disabled={!!error}
        />

        <Inputbox label="Location" value={formData.location} disabled />
        <Inputbox label="Shared Campus" value={formData.campusName} disabled />
        <Inputbox label="Manager" value={formData.manager} disabled />
        <Inputbox
          label="Reporting Manager"
          value={formData.reportingManager}
          disabled
        />

        <div className={styles.formGroup}>
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="3"
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
            buttonname="Un-map"
            type="submit"
            variant="primary"
            righticon={rightArrowIcon}
            width="160px"
            disabled={!!error || !formData.toDate}
          />
        </div>
      </form>
    </div>
  );
};

export default UnassignGroupForm;