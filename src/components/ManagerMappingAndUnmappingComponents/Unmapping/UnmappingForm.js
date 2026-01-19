// import React, { useState, useEffect } from "react";
// import styles from "../Remapping/RemappingForm.module.css";
// import Inputbox from "widgets/Inputbox/InputBox";
// import Button from "widgets/Button/Button";
// // import conformicon from "assets/ManagerMappingAndUnmappingAssets/conformicon";
// import reMapIcon from "assets/ManagerMappingAndUnmappingAssets/ReMapIcon.svg";
// import UnmapIcon from "assets/ManagerMappingAndUnmappingAssets/Unmap(Icon).svg";
// import { unmapEmployee } from "api/managerMapping/managerMapping";

// const UnmappingForm = ({ employee, onSuccess, isUnmapped }) => {
//   const [formData, setFormData] = useState({
//     payrollId: "",
//     cityId: null,
//     managerId: null,
//     reportingManagerId: null,
//     campusIds: [],
//     lastDate: "",
//     remark: ""
//   });

//   const [loading, setLoading] = useState(false);

//   /* 🔹 Auto-fill IDs */
//   useEffect(() => {
//     if (!employee) return;

//     setFormData(prev => ({
//       ...prev,
//       payrollId: employee.id,
//       cityId: employee.cityId || 322,
//       managerId: employee.managerId,
//       reportingManagerId: employee.reportingManagerId,
//       campusIds: employee.campus?.id ? [employee.campus.id] : []
//     }));
//   }, [employee]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!employee.campus?.id) {
//       alert("Campus mapping not found. Please reselect employee.");
//       return;
//     }

//     const payload = {
//       payrollId: employee.id,
//       cityId: employee.cityId,
//       campusIds: [employee.campus.id],
//       managerId: employee.managerId || 0,
//       reportingManagerId: employee.reportingManagerId || 0,
//       lastDate: new Date(formData.lastDate).toISOString(),
//       remark: formData.remark,
//       updatedBy: 1
//     };

//     try {
//       setLoading(true);
//       await unmapEmployee(payload);
//       // Trigger the success state in the parent component
//       if (onSuccess) {
//         onSuccess(employee.id);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to unmap employee.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * 🎯 UI Logic: If the employee is successfully unmapped, 
//    * we hide the form and show the "Re-map" button as per Figma.
//    */
//   if (isUnmapped) {
//     return (
//       <div className={styles.remapButtonWrapper}>
//         <Button
//           buttonname="Re-map"
//           variant="primary"
//           width="142px"
//           righticon={<img src={reMapIcon} alt="remap" />}
//           onClick={() => {
//             // Logic for Re-map route can be added here later
//             console.log("Re-mapping employee:", employee.id);
//           }}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className={styles.remappingFormSection}>
//       <h3 className={styles.remappingTitle}>Un-Mapping</h3>

//       <form className={styles.remappingForm} onSubmit={handleSubmit}>
//         <Inputbox
//           label="To Date"
//           name="lastDate"
//           type="date"
//           value={formData.lastDate}
//           onChange={handleChange}
//           required
//         />

//         <Inputbox label="Location" value={employee.city || "—"} disabled />
//         <Inputbox label="Shared Campus" value={employee.campus?.name || "—"} disabled />
//         <Inputbox label="Manager" value={employee.manager || "—"} disabled />
//         <Inputbox
//           label="Reporting Manager"
//           value={employee.reportingManager || "—"}
//           disabled
//         />

//         <div className={styles.formGroup}>
//           <label>Remarks</label>
//           <textarea
//             name="remark"
//             value={formData.remark}
//             onChange={handleChange}
//             rows="3"
//             placeholder="Enter remark"
//           />
//         </div>

//         <div className={styles.formActions}>
//           <Button
//             buttonname={loading ? "Processing..." : "Confirm"}
//             type="submit"
//             variant="primary"
//             disabled={loading}
//             righticon={<img src={UnmapIcon} alt="Unmap" />}
//             width="142px"
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UnmappingForm;
import React, { useState, useEffect } from "react";
import styles from "../Remapping/RemappingForm.module.css";
import Inputbox from "widgets/Inputbox/InputBox";
import Button from "widgets/Button/Button";
import reMapIcon from "assets/ManagerMappingAndUnmappingAssets/ReMapIcon.svg";
import UnmapIcon from "assets/ManagerMappingAndUnmappingAssets/Unmap(Icon).svg";
import { unmapEmployee } from "api/managerMapping/managerMapping";
import RemappingForm from "../Remapping/RemappingForm";
import EmployeeDetailsCard from "../EmployeeDetailsCard/EmployeeDetailsCard";

const UnmappingForm = ({ employee, onSuccess, isUnmapped }) => {
  const [formData, setFormData] = useState({
    payrollId: "",
    cityId: null,
    managerId: null,
    reportingManagerId: null,
    campusIds: [],
    lastDate: "",
    remark: "",
    cityName: "",
    campusName: "",
    managerName: "",
    reportingManagerName: ""
  });

  const [loading, setLoading] = useState(false);
  const [showRemap, setShowRemap] = useState(false);

  // 🔹 Local state to override the parent's isUnmapped prop
  const [internalIsUnmapped, setInternalIsUnmapped] = useState(isUnmapped);

  // Sync internal state with prop
  useEffect(() => {
    setInternalIsUnmapped(isUnmapped);
  }, [isUnmapped]);

  // 🔹 Auto-fill IDs and names
  useEffect(() => {
    if (!employee) return;

    setFormData(prev => ({
      ...prev,
      payrollId: employee.id,
      cityId: employee.cityId || 322,
      campusIds: employee.campus?.id ? [employee.campus.id] : [],
      managerId: employee.managerId,
      reportingManagerId: employee.reportingManagerId,
      lastDate: "",
      remark: "",
      cityName: employee.city || "—",
      campusName: employee.campus?.name || "—",
      managerName: employee.manager || "—",
      reportingManagerName: employee.reportingManager || "—"
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

    if (!employee.campus?.id) {
      alert("Campus mapping not found. Please reselect employee.");
      return;
    }

    const payload = {
      payrollId: employee.id,
      cityId: employee.cityId,
      campusIds: [employee.campus.id],
      managerId: employee.managerId || 0,
      reportingManagerId: employee.reportingManagerId || 0,
      lastDate: new Date(formData.lastDate).toISOString(),
      remark: formData.remark,
      updatedBy: 1
    };

    try {
      setLoading(true);
      await unmapEmployee(payload);
      if (onSuccess) onSuccess(employee.id);
    } catch (err) {
      console.error(err);
      alert("Failed to unmap employee.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartRemap = () => {
    setInternalIsUnmapped(false); // Kill the success state locally
    setShowRemap(true);
  };

  // 🔹 1. Show Re-map button after successful unmap
  if (internalIsUnmapped && !showRemap) {
    return (
      <div className={styles.remapButtonWrapper}>
        <Button
          buttonname="Re-map"
          variant="primary"
          width="142px"
          righticon={<img src={reMapIcon} alt="remap" />}
          onClick={handleStartRemap}
        />
      </div>
    );
  }

  // 🔹 2. Show Remapping form (This is where your issue was)
  if (showRemap) {
    return (
      <div key="remapping-session-wrapper"> {/* Key on wrapper helps too */}
        <EmployeeDetailsCard
          key={employee?.id || "remap-card"} // 👈 THIS IS THE FIX
          employee={employee}
          hideHeader={true}
          isUnmapped={false}
          hideSuccess={true}
        />
        <RemappingForm employee={employee} />
      </div>
    );
  }

  // 🔹 3. Default Unmapping Form
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

        <Inputbox label="Location" name="cityName" value={formData.cityName} disabled />
        <Inputbox
          label="Shared Campus"
          name="campusName"
          value={formData.campusName}
          disabled
        />
        <Inputbox label="Manager" name="managerName" value={formData.managerName} disabled />
        <Inputbox
          label="Reporting Manager"
          name="reportingManagerName"
          value={formData.reportingManagerName}
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
            righticon={<img src={UnmapIcon} alt="Unmap" />}
            width="142px"
          />
        </div>
      </form>
    </div>
  );
};

export default UnmappingForm;