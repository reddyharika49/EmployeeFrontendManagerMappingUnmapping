import axios from "axios";

const BASE_URL = "http://localhost:8080/api/employeeModule";
const SEARCH_BASE_URL = "http://localhost:8080/api/employee";
const COMMON_BASE_URL = "http://localhost:9000/common";


const MAPPING_BASE_URL = "http://localhost:8080/api/manager-mapping";

export const getStates = async () => {
  try {
    const res = await axios.get(
      `${COMMON_BASE_URL}/get/states`);
    return res.data;
  } catch (err) {
    console.error("Error fetching states", err);
    return [];
  }
};
// common API
export const getCities = async () => {
    try {
      const res = await axios.get(
        `${COMMON_BASE_URL}/get/cities`
      );
      return res.data;
    } catch (err) {
      console.error("Error fetching cities", err);
      return [];
    }
  };
  

export const getCitiesByStateId = async (stateId) => {
  try {
    const res = await axios.get(`${COMMON_BASE_URL}/get/city/${stateId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching cities", err);
    return [];
  }
};

export const getCampusesByCityId = async (cityId) => {
  try {
    const res = await axios.get(`${BASE_URL}/campuses/${cityId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching campuses", err);
    return [];
  }
};

// Fetch Employee Types
export const getEmployeeTypes = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/employee-type`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching employee types:", error);
      return [];
    }
  };

  // Fetch Departments by Employee Type
export const getDepartmentsByEmpType = async (empTypeId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/department/${empTypeId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      return [];
    }
  };
  
/* =========================
   CAMPUSES BY LOCATION
========================= */
export const getCampusesByLocation = async (locationId) => {
    if (!locationId) return [];
    const res = await axios.get(
      `http://localhost:8080/api/employeeModule/campuses/${locationId}`
    );
    return res.data;
  };
  
  /* =========================
     ALL DEPARTMENTS
  ========================= */
  export const getDepartments = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/campus-flow/alldepartments"
    );
    return res.data;
  };
  
  /* =========================
     DESIGNATIONS BY DEPARTMENT
  ========================= */
  export const getDesignationsByDepartment = async (departmentId) => {
    if (!departmentId) return [];
    const res = await axios.get(
      `http://localhost:8080/api/employeeModule/designation/${departmentId}`
    );
    return res.data;
  };


  // export const getEmployeesByDepartmentAndCampus = async (departmentId,campusId) => {
  //   if (!departmentId) return [];
  //   const res = await axios.get(
  //     `http://localhost:8080/api/campus-flow/getemployees/${departmentId}/${campusId}`
  //   );
  //   return res.data;
  // };
  export const getEmployeesByCampus = async (campusId) => {
    if (!campusId) return [];
    const res = await axios.get(
      `http://localhost:8080/api/employeeModule/employees/campus/${campusId}`
    );
    return res.data;
  };



  //Search employees

  export const advancedEmployeeSearch = async (params) => {
    const res = await axios.get(`${SEARCH_BASE_URL}/search/advanced-list`, { params });
    return res.data;
  };

  export const fetchBatchCampusAddresses = (payrollIds) => {
    return axios.post(
      `${MAPPING_BASE_URL}/batch-campus-address`,
      payrollIds
    );};

    export const mapEmployee = async (payload) => {
      const res = await axios.post(
        "http://localhost:8080/api/manager-mapping/map-employees",
        payload
      );
      return res.data;
    };

    export const mapEmployeeGroup = async (payload) => {
      const res = await axios.post(
        "http://localhost:8080/api/manager-mapping/map-multiple-employees",
        payload
      );
      return res.data;
    };

    export const unmapEmployee = (payload) => {
      return axios.post(
        "http://localhost:8080/api/manager-mapping/unmap-employee",
        payload
      );
    };