// import React, { useState, useEffect } from 'react';
// import styles from './MainContentGrid.module.css';
// import EmployeeDetailsCard from '../EmployeeDetailsCard/EmployeeDetailsCard';
// import AddEmployeeWidget from 'widgets/ManagerMappingAndUnmappingWidgets/AddNewEmployee(Blank)/AddEmployeeWidget';
// import RemappingForm from './RemappingForm';
// import AddNewEmployeePopup from '../AddNewEmployeePopup/AddNewEmployeePopup';
// // import { generateEmployee } from '../../../utils/employeeDataGenerator';
// import backarrow from 'assets/managermappingsearch/topleftarrow.svg';
// import { useNavigate} from "react-router-dom";

// // Convert employee to grid format - moved outside to avoid dependency issues
// const convertEmployeeToGridFormat = (emp, idx) => {
//   const reportingManagers = ['Vamsi Ramana', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma', 'Lakshmi Nair'];
//   const managers = ['Raja', 'Venkat', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma'];
//   const managerIndex = idx % managers.length;
//   const reportingManagerIndex = idx % reportingManagers.length;
 
//   // Debug each employee conversion
//   console.log(`Converting employee ${idx}:`, emp);
  
//   return {
//     id: emp.id || `HYD ${String(5627182 + idx).padStart(7, '0')}`,
//     name: emp.name || emp.employeeName || 'Unknown',
//     department: emp.dept || emp.department || 'IT Cell',
//     level: emp.level || 'Level 4',
//     type: emp.status || emp.type || 'Permanent',
//     campus: {
//       name: 'Name Of The Campus',
//       address: 'Infinity Towers, Plot No 2-91/31, Near N Convention Road, HITEC City, Hyderabad, Telangana 500081'
//     },
//     reportingManager: reportingManagers[reportingManagerIndex],
//     manager: managers[managerIndex],
//     project: 'IPL'
//   };
// };

// const MainContentGrid = ({ initialEmployees = [] }) => {

//   const navigate = useNavigate();
//   const goBack = () => navigate(-1);
//   // Debug: Log to see what we're receiving
//   console.log('MainContentGrid - initialEmployees:', initialEmployees);
//   console.log('MainContentGrid - initialEmployees length:', initialEmployees.length);

//   // Initialize with provided employees or default to one generated employee
//   // const initialEmployeesFormatted = initialEmployees.length > 0 
//   //   ? initialEmployees.map((emp, idx) => convertEmployeeToGridFormat(emp, idx))
//   //   : [generateEmployee(0)];

//   // console.log('MainContentGrid - initialEmployeesFormatted:', initialEmployeesFormatted);
//   // console.log('MainContentGrid - initialEmployeesFormatted length:', initialEmployeesFormatted.length);

//   // const [employees, setEmployees] = useState(initialEmployeesFormatted);
//   const [isAddEmployeePopupOpen, setIsAddEmployeePopupOpen] = useState(false);

//   // Update employees when initialEmployees prop changes
//   useEffect(() => {
//     if (initialEmployees.length > 0) {
//       const formatted = initialEmployees.map((emp, idx) => convertEmployeeToGridFormat(emp, idx));
//       console.log('MainContentGrid - useEffect updating employees:', formatted);
//       console.log('MainContentGrid - useEffect formatted length:', formatted.length);
//       setEmployees(formatted);
//     }
//   }, [initialEmployees]);

//   const handleAddEmployeeClick = () => {
//     setIsAddEmployeePopupOpen(true);
//   };

//   // const handleAddEmployees = (selectedEmployees) => {
//   //   // Convert selected employees to the format expected by the grid
//   //   const reportingManagers = ['Vamsi Ramana', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma', 'Lakshmi Nair'];
//   //   const managers = ['Raja', 'Venkat', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma'];
    
//   //   const newEmployees = selectedEmployees.map((emp, idx) => {
//   //     const managerIndex = (employees.length + idx) % managers.length;
//   //     const reportingManagerIndex = (employees.length + idx) % reportingManagers.length;
      
//   //     return {
//   //       id: emp.id,
//   //       name: emp.name,
//   //       department: emp.dept,
//   //       level: emp.level,
//   //       type: emp.status,
//   //       campus: {
//   //         name: 'Name Of The Campus',
//   //         address: 'Infinity Towers, Plot No 2-91/31, Near N Convention Road, HITEC City, Hyderabad, Telangana 500081'
//   //       },
//   //       reportingManager: reportingManagers[reportingManagerIndex],
//   //       manager: managers[managerIndex],
//   //       project: 'IPL'
//   //     };
//   //   });
//   //   setEmployees([...employees, ...newEmployees]);
//   // };

//   return (
//     <>
//       <div className={styles.mainContentGrid}>
//         <div>
//           <div className={styles.topRow}>
//             <img src={backarrow} alt="back" className={styles.backIcon} onClick={goBack} />
//             <div className={styles.modeheader}>
//               <h2 className={styles.title}>Assign Employee To Campus</h2>
//               <p className={styles.subtitle}>Assign Campus to each of employees</p>
//             </div>
//           </div>

       
//           </div>
//           <div className={styles.employeeGrid}>
//         {employees.map((employee, index) => (
//           <div key={index} className={styles.gridColumn}>
//             <EmployeeDetailsCard 
//               employee={employee}
//             />
//             <RemappingForm 
//               employee={employee}
//             />
//           </div>
//         ))}
        
//         <div className={styles.gridColumn}>
//           <AddEmployeeWidget onClick={handleAddEmployeeClick} />
//         </div>
//       </div>

//       <AddNewEmployeePopup
//         isOpen={isAddEmployeePopupOpen}
//         onClose={() => setIsAddEmployeePopupOpen(false)}
//         onAddEmployees={handleAddEmployees}
//       />
//       </div>
//     </>
//   );
// };

// export default MainContentGrid;
// import React, { useState, useEffect } from 'react';
// import styles from './MainContentGrid.module.css';
// import EmployeeDetailsCard from '../EmployeeDetailsCard/EmployeeDetailsCard';
// import AddEmployeeWidget from 'widgets/ManagerMappingAndUnmappingWidgets/AddNewEmployee(Blank)/AddEmployeeWidget';
// import RemappingForm from './RemappingForm';
// import AddNewEmployeePopup from '../AddNewEmployeePopup/AddNewEmployeePopup';
// import backarrow from 'assets/managermappingsearch/topleftarrow.svg';
// import { useNavigate, useLocation } from "react-router-dom";
 
// import { fetchBatchCampusAddresses } from "api/managerMapping/managerMapping";
 
// /* 🔁 Merge selected card + API data */
// const convertEmployeeToGridFormat = (emp, apiData = {}) => {
//   console.log("MAPPING EMP:", emp.payRollId, apiData.campusId || emp.campusId);
//   return {
//     id: emp.payRollId || emp.payrollId,
 
//     name: emp.empName || "—",
//     department: emp.departmentName || "—",
//     level: emp.employeeTypeName || "—",
//     type: emp.modeOfHiringName || "—",
 
//     phoneNumber: apiData.employeeMobileNo || null,
//     email: emp.email || null,
//     city:apiData.city || null,
//     cityId:apiData.cityId ||null,
 
//     campus: {
//       id: apiData.campusId || emp.campusId,        
//       name: emp.campusName || "—",
//       address: apiData.fullAddress || "—"
//     },
 
//     reportingManager: apiData.reportingManagerName || "—",
//     managerId:apiData.managerId ||null,
//     manager: apiData.managerName || "—",
//     reportingManagerId:apiData.reportingManagerId ||null,
 
//     project: emp.projectName || "—"
//   };
// };
 
// const MainContentGrid = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const goBack = () => navigate(-1);
 
//   const selectedEmployees = location.state?.selectedEmployees || [];
 
//   const [employees, setEmployees] = useState([]);
//   const [isAddEmployeePopupOpen, setIsAddEmployeePopupOpen] = useState(false);
 
//   useEffect(() => {
//     if (selectedEmployees.length === 0) return;
 
//     const payrollIds = selectedEmployees.map(emp => emp.payRollId);
 
//     fetchBatchCampusAddresses(payrollIds)
//       .then(res => {
//         const apiResponse = res.data || [];
 
//         // Create lookup map
//         const apiMap = {};
//         apiResponse.forEach(item => {
//           apiMap[item.payrollId] = item;
//         });
 
//         const mergedEmployees = selectedEmployees.map(emp => {
//           const apiData = apiMap[emp.payRollId] || {};
//           return convertEmployeeToGridFormat(emp, apiData);
//         });
 
//         setEmployees(mergedEmployees);
//       })
//       .catch(err => {
//         console.error("Failed to fetch campus details", err);
 
//         // fallback: show selected data only
//         const fallback = selectedEmployees.map(emp =>
//           convertEmployeeToGridFormat(emp)
//         );
//         setEmployees(fallback);
//       });
 
//   }, [selectedEmployees]);
 
//   const handleAddEmployeeClick = () => {
//     setIsAddEmployeePopupOpen(true);
//   };
 
//   const handleAddEmployees = (newSelectedEmployees) => {
//     const payrollIds = newSelectedEmployees.map(emp => emp.payRollId);
 
//     fetchBatchCampusAddresses(payrollIds).then(res => {
//       const apiMap = {};
//       res.data.forEach(item => {
//         apiMap[item.payrollId] = item;
//       });
 
//       const formatted = newSelectedEmployees.map(emp =>
//         convertEmployeeToGridFormat(emp, apiMap[emp.payRollId])
//       );
 
//       setEmployees(prev => [...prev, ...formatted]);
//     });
//   };
 
//   return (
//     <>
//       <div className={styles.mainContentGrid}>
//         <div>
//           <div className={styles.topRow}>
//             <img
//               src={backarrow}
//               alt="back"
//               className={styles.backIcon}
//               onClick={goBack}
//             />
//             <div className={styles.modeheader}>
//               <h2 className={styles.title}>Assign Employee To Campus</h2>
//               <p className={styles.subtitle}>
//                 Assign Campus to each of employees
//               </p>
//             </div>
//           </div>
//         </div>
 
//         <div className={styles.employeeGrid}>
//           {employees.map((employee, index) => (
//             <div key={index} className={styles.gridColumn}>
//               <EmployeeDetailsCard employee={employee} />
//               <RemappingForm employee={employee} />
//             </div>
//           ))}
 
//           <div className={styles.gridColumn}>
//             <AddEmployeeWidget onClick={handleAddEmployeeClick} />
//           </div>
//         </div>
 
//         <AddNewEmployeePopup
//           isOpen={isAddEmployeePopupOpen}
//           onClose={() => setIsAddEmployeePopupOpen(false)}
//           onAddEmployees={handleAddEmployees}
//         />
//       </div>
//     </>
//   );
// };
 
// export default MainContentGrid;
import React, { useState, useEffect } from 'react';
import styles from './MainContentGrid.module.css';
import EmployeeDetailsCard from '../EmployeeDetailsCard/EmployeeDetailsCard';
import AddEmployeeWidget from 'widgets/ManagerMappingAndUnmappingWidgets/AddNewEmployee(Blank)/AddEmployeeWidget';
import RemappingForm from './RemappingForm';
import AddNewEmployeePopup from '../AddNewEmployeePopup/AddNewEmployeePopup';
import backarrow from 'assets/managermappingsearch/topleftarrow.svg';
import { useNavigate, useLocation } from "react-router-dom";
 
import { fetchBatchCampusAddresses } from "api/managerMapping/managerMapping";
 
/* 🔁 Helper: Merges selected card data with API data */
const convertEmployeeToGridFormat = (emp, apiData = {}) => {
  return {
    id: emp.payRollId || emp.payrollId,
    name: emp.empName || "—",
    department: emp.departmentName || "—",
    level: emp.employeeTypeName || "—",
    type: emp.modeOfHiringName || "—",
    phoneNumber: apiData.employeeMobileNo || null,
    email: emp.email || null,
    city: apiData.city || null,
    cityId: apiData.cityId || null,
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
 
const MainContentGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => navigate(-1);
 
  const selectedEmployees = location.state?.selectedEmployees || [];
 
  const [employees, setEmployees] = useState([]);
  const [isAddEmployeePopupOpen, setIsAddEmployeePopupOpen] = useState(false);
  const [remappedEmployees, setRemappedEmployees] = useState(new Set()); // 👈 New: Track remapped employee IDs

  /* 🔹 Initial Load from Navigation State */
  useEffect(() => {
    if (selectedEmployees.length === 0) return;
    fetchAndSetEmployees(selectedEmployees);
  }, [selectedEmployees]);

  /* 🔹 reusable function to fetch API details and update state */
  const fetchAndSetEmployees = (employeeList, isNewBatch = false) => {
    const payrollIds = employeeList.map(emp => emp.payRollId || emp.id);

    fetchBatchCampusAddresses(payrollIds)
      .then(res => {
        const apiResponse = res.data || [];
        const apiMap = {};
        apiResponse.forEach(item => {
          apiMap[item.payrollId] = item;
        });

        const formatted = employeeList.map(emp => {
          // Normalize structure so 'convert' helper works for both initial and popup data
          const normalized = {
            payRollId: emp.payRollId || emp.id,
            empName: emp.empName || emp.name,
            departmentName: emp.departmentName || emp.dept,
            employeeTypeName: emp.employeeTypeName || emp.level,
            modeOfHiringName: emp.modeOfHiringName || emp.status,
            campusId: emp.campusId,
            campusName: emp.campusName,
            email: emp.email,
            projectName: emp.projectName
          };
          return convertEmployeeToGridFormat(normalized, apiMap[normalized.payRollId] || {});
        });

        setEmployees(prev => {
          if (!isNewBatch) return formatted;
          const existingIds = new Set(prev.map(e => e.id));
          const filteredNewOnes = formatted.filter(e => !existingIds.has(e.id));
          return [...prev, ...filteredNewOnes];
        });
      })
      .catch(err => console.error("Failed to fetch campus details", err));
  };
 
  const handleAddEmployeeClick = () => {
    setIsAddEmployeePopupOpen(true);
  };
 
  /* 🔹 Handle Adding Employees from Popup (Sync with Unmapping Logic) */
  const handleAddEmployees = (newSelectedEmployees) => {
    // We pass true to indicate this is a new batch being appended
    fetchAndSetEmployees(newSelectedEmployees, true);
  };

  /* 👈 New: Callback from RemappingForm to mark employee as remapped */
  const handleRemapSuccess = (employeeId) => {
    setRemappedEmployees(prev => new Set([...prev, employeeId]));
  };
 
  return (
    <>
      <div className={styles.mainContentGrid}>
        <div>
          <div className={styles.topRow}>
            <img
              src={backarrow}
              alt="back"
              className={styles.backIcon}
              onClick={goBack}
            />
            <div className={styles.modeheader}>
              <h2 className={styles.title}>Assign Employee To Campus</h2>
              <p className={styles.subtitle}>
                Assign Campus to each of employees
              </p>
            </div>
          </div>
        </div>
 
        <div className={styles.employeeGrid}>
          {employees.map((employee, index) => (
            <div key={employee.id || index} className={styles.gridColumn}>
              {/* 👈 Conditionally hide initial card if remapped */}
              {!remappedEmployees.has(employee.id) && (
                <EmployeeDetailsCard 
                  employee={employee} 
                  hideHeader={false} 
                  showComparison={false} // 👈 Explicitly non-comparison mode
                />
              )}
              <RemappingForm 
                employee={employee} 
                onSuccess={() => handleRemapSuccess(employee.id)} // 👈 New: Notify parent on success
              />
            </div>
          ))}
 
          <div className={styles.gridColumn}>
            <AddEmployeeWidget onClick={handleAddEmployeeClick} />
          </div>
        </div>
 
        <AddNewEmployeePopup
          isOpen={isAddEmployeePopupOpen}
          onClose={() => setIsAddEmployeePopupOpen(false)}
          onAddEmployees={handleAddEmployees}
        />
      </div>
    </>
  );
};
 
export default MainContentGrid;