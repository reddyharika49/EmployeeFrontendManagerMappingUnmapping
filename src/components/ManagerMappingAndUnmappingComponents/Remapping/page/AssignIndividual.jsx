// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import MainContentGrid from "../MainContentGrid";

// const AssignIndividual = () => {
//   const location = useLocation();
//   const selectedEmployees = location.state?.selectedEmployees || [];

//   const [employeesFromApi, setEmployeesFromApi] = useState([]);

//   useEffect(() => {
//     if (!selectedEmployees.length) return;

//     // ✅ STEP 1: take ONLY payrollId
//     const payrollIds = selectedEmployees.map(emp => emp.payRollId);

//     // ✅ STEP 2: call backend
//     axios.post(
//       "http://localhost:8080/api/manager/batch-campus-address",
//       payrollIds
//     )
//     .then(res => {
//       setEmployeesFromApi(res.data);
//     })
//     .catch(err => {
//       console.error("Batch API failed", err);
//     });

//   }, [selectedEmployees]);

//   return (
//     <MainContentGrid initialEmployees={employeesFromApi} />
//   );
// };

// export default AssignIndividual;
