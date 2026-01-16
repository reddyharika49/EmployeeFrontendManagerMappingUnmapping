import React, { useState, useEffect } from "react";
import styles from "../Remapping/MainContentGrid.module.css";

import EmployeeDetailsCard from "../EmployeeDetailsCard/EmployeeDetailsCard";
import AddEmployeeWidget from "widgets/ManagerMappingAndUnmappingWidgets/AddNewEmployee(Blank)/AddEmployeeWidget";
import UnmappingForm from "./UnmappingForm";
import AddNewEmployeePopup from "../AddNewEmployeePopup/AddNewEmployeePopup";

import backarrow from "assets/managermappingsearch/topleftarrow.svg";
import { useNavigate, useLocation } from "react-router-dom";

import { fetchBatchCampusAddresses } from "api/managerMapping/managerMapping";

/* 🔁 Merge selected card + API data */
const convertEmployeeToGridFormat = (emp, apiData = {}) => {
  return {
    id: emp.payRollId || emp.payrollId,
    name: emp.empName || "—",
    department: emp.departmentName || "—",
    level: emp.employeeTypeName || "—",
    type: emp.modeOfHiringName || "—",
    phoneNumber: apiData.employeeMobileNo || null,
    city: apiData.city || null,
    cityId: apiData.cityId || null,
    email: emp.email || null,
    campus: {
      id: apiData.campusId || emp.campusId,
      name: emp.campusName || "—",
      address: apiData.fullAddress || "—"
    },
    reportingManager: apiData.reportingManagerName || "—",
    managerId: apiData.managerId || null,
    manager: apiData.managerName || "—",
    reportingManagerId: apiData.reportingManagerId || null,
    project: emp.projectName || "—"
  };
};

const UnmappingContentGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => navigate(-1);

  const selectedEmployees = location.state?.selectedEmployees || [];

  const [employees, setEmployees] = useState([]);
  const [isAddEmployeePopupOpen, setIsAddEmployeePopupOpen] = useState(false);
  
  /** * 🎯 Logic for UI Change: 
   * We keep an array of IDs that have been successfully unmapped.
   */
  const [unmappedEmployees, setUnmappedEmployees] = useState([]);

  /* 🔹 Initial load – selected employees */
  useEffect(() => {
    if (selectedEmployees.length === 0) return;

    const payrollIds = selectedEmployees.map(emp => emp.payRollId);

    fetchBatchCampusAddresses(payrollIds)
      .then(res => {
        const apiResponse = res.data || [];
        const apiMap = {};
        apiResponse.forEach(item => {
          apiMap[item.payrollId] = item;
        });

        const mergedEmployees = selectedEmployees.map(emp =>
          convertEmployeeToGridFormat(emp, apiMap[emp.payRollId])
        );

        setEmployees(mergedEmployees);
      })
      .catch(err => {
        console.error("Failed to fetch campus details", err);
      });
  }, [selectedEmployees]);

  /* 🔹 Add employee popup */
  const handleAddEmployeeClick = () => {
    setIsAddEmployeePopupOpen(true);
  };

  /* 🔹 Handle Success from UnmappingForm */
  const handleUnmapSuccess = (payrollId) => {
    setUnmappedEmployees((prev) => [...prev, payrollId]);
  };

  /* 🔹 Add more employees */
  const handleAddEmployees = (newSelectedEmployees) => {
    const normalizedEmployees = newSelectedEmployees.map(emp => ({
      payRollId: emp.id,
      empId: emp.empId,
      empName: emp.name,
      departmentName: emp.dept,
      employeeTypeName: emp.level,
      modeOfHiringName: emp.status,
      campusId: emp.campusId,
      campusName: emp.campusName
    }));
  
    const payrollIds = normalizedEmployees.map(emp => emp.payRollId);
  
    fetchBatchCampusAddresses(payrollIds)
      .then(res => {
        const apiMap = {};
        res.data.forEach(item => {
          apiMap[item.payrollId] = item;
        });
  
        const formatted = normalizedEmployees.map(emp =>
          convertEmployeeToGridFormat(emp, apiMap[emp.payRollId])
        );
  
        // ✅ ADD HERE (replace old setEmployees)
        setEmployees(prev => {
          const existingIds = new Set(prev.map(e => e.id));
          const filtered = formatted.filter(e => !existingIds.has(e.id));
          return [...prev, ...filtered];
        });
      })
      .catch(err => {
        console.error("Failed to fetch additional employees", err);
      });
  };
  


  return (
    <div className={styles.mainContentGrid}>
      {/* Header */}
      <div className={styles.topRow}>
        <img
          src={backarrow}
          alt="back"
          className={styles.backIcon}
          onClick={goBack}
        />
        <div className={styles.modeheader}>
          <h2 className={styles.title}>Unmap Employees</h2>
          <p className={styles.subtitle}>Unmap each of employees</p>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.employeeGrid}>
        {employees.map((employee, index) => {
          // Check if this specific employee is unmapped
          const isSuccess = unmappedEmployees.includes(employee.id);

          return (
            <div key={employee.id || index} className={styles.gridColumn}>
              {/* Pass the success state to the Card to hide Campus Details */}
              <EmployeeDetailsCard 
                employee={employee} 
                isUnmapped={isSuccess} 
              />
              
              {/* Pass success state and the handler to the Form */}
              <UnmappingForm 
                employee={employee} 
                onSuccess={() => handleUnmapSuccess(employee.id)}
                isUnmapped={isSuccess}
              />
            </div>
          );
        })}

        <div className={styles.gridColumn}>
          <AddEmployeeWidget onClick={handleAddEmployeeClick} />
        </div>
      </div>

      {/* Popup */}
      <AddNewEmployeePopup
        isOpen={isAddEmployeePopupOpen}
        onClose={() => setIsAddEmployeePopupOpen(false)}
        onAddEmployees={handleAddEmployees}
      />
    </div>
  );
};

export default UnmappingContentGrid;
//Updated

// import React, { useEffect, useState } from "react";
// import styles from "../Remapping/MainContentGrid.module.css";

// import EmployeeDetailsCard from "../EmployeeDetailsCard/EmployeeDetailsCard";
// import AddEmployeeWidget from "widgets/ManagerMappingAndUnmappingWidgets/AddNewEmployee(Blank)/AddEmployeeWidget";
// import UnmappingForm from "./UnmappingForm";
// import RemappingForm from "../Remapping/RemappingForm";
// import AddNewEmployeePopup from "../AddNewEmployeePopup/AddNewEmployeePopup";

// import backarrow from "assets/managermappingsearch/topleftarrow.svg";
// import { useNavigate, useLocation } from "react-router-dom";
// import { fetchBatchCampusAddresses } from "api/managerMapping/managerMapping";

// /* 🔁 Merge selected card + API data */
// const convertEmployeeToGridFormat = (emp, apiData = {}) => ({
//   id: emp.payRollId || emp.payrollId,
//   name: emp.empName || "—",
//   department: emp.departmentName || "—",
//   level: emp.employeeTypeName || "—",
//   type: emp.modeOfHiringName || "—",
//   city: apiData.city || null,
//   cityId: apiData.cityId || null,
//   campus: {
//     id: apiData.campusId || emp.campusId,
//     name: emp.campusName || "—",
//     address: apiData.fullAddress || "—"
//   },
//   reportingManager: apiData.reportingManagerName || "—",
//   reportingManagerId: apiData.reportingManagerId || null,
//   manager: apiData.managerName || "—",
//   managerId: apiData.managerId || null,
//   project: emp.projectName || "—"
// });

// const UnmappingContentGrid = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const goBack = () => navigate(-1);

//   const selectedEmployees = location.state?.selectedEmployees || [];

//   const [employees, setEmployees] = useState([]);
//   const [isAddEmployeePopupOpen, setIsAddEmployeePopupOpen] = useState(false);

//   /* ✅ Unmap + Remap control */
//   const [unmappedEmployees, setUnmappedEmployees] = useState([]);
//   const [remapEmployeeId, setRemapEmployeeId] = useState(null);

//   /* 🔹 Initial load */
//   useEffect(() => {
//     if (!selectedEmployees.length) return;

//     const payrollIds = selectedEmployees.map(emp => emp.payRollId);

//     fetchBatchCampusAddresses(payrollIds).then(res => {
//       const apiMap = {};
//       (res.data || []).forEach(item => {
//         apiMap[item.payrollId] = item;
//       });

//       setEmployees(
//         selectedEmployees.map(emp =>
//           convertEmployeeToGridFormat(emp, apiMap[emp.payRollId])
//         )
//       );
//     });
//   }, [selectedEmployees]);

//   /* 🔹 Unmap success */
//   const handleUnmapSuccess = (payrollId) => {
//     setUnmappedEmployees(prev => [...prev, payrollId]);
//     setRemapEmployeeId(null);
//   };

//   return (
//     <div className={styles.mainContentGrid}>
//       {/* Header */}
//       <div className={styles.topRow}>
//         <img src={backarrow} alt="back" className={styles.backIcon} onClick={goBack} />
//         <div className={styles.modeheader}>
//           <h2 className={styles.title}>Unmap Employees</h2>
//           <p className={styles.subtitle}>Unmap each of employees</p>
//         </div>
//       </div>

//       {/* Grid */}
//       <div className={styles.employeeGrid}>
//         {employees.map((employee, index) => {
//           const isUnmapped = unmappedEmployees.includes(employee.id);
//           const isRemapMode = remapEmployeeId === employee.id;

//           return (
//             <div key={employee.id || index} className={styles.gridColumn}>
              
//               {/* Employee Card */}
//               <EmployeeDetailsCard
//                 employee={employee}
//                 isUnmapped={isUnmapped && !isRemapMode}
               
//               />

//               {/* UNMAP FORM */}
//               {!isRemapMode && (
//                 <UnmappingForm
//                   employee={employee}
//                   isUnmapped={isUnmapped}
//                   onSuccess={() => handleUnmapSuccess(employee.id)}
//                   onRemap={() => {
//                     setRemapEmployeeId(employee.id);
//                     setUnmappedEmployees(prev =>
//                       prev.filter(id => id !== employee.id)
//                     );
//                   }}
//                 />
//               )}

//               {/* REMAP FORM */}
//               {isRemapMode && (
//                 <RemappingForm employee={employee} />
//               )}
//             </div>
//           );
//         })}

//         <div className={styles.gridColumn}>
//           <AddEmployeeWidget onClick={() => setIsAddEmployeePopupOpen(true)} />
//         </div>
//       </div>

//       {/* Popup */}
//       <AddNewEmployeePopup
//         isOpen={isAddEmployeePopupOpen}
//         onClose={() => setIsAddEmployeePopupOpen(false)}
//         onAddEmployees={() => {}}
//       />
//     </div>
//   );
// };

// export default UnmappingContentGrid;


