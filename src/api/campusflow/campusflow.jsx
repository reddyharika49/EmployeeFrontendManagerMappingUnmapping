import axios from "axios";

const BASE_URL = "http://localhost:8080/api/campus-flow";
const COMMON_BASE = "http://localhost:9000";

export const campusFlowApi = {
  getAllBusinessTypes: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getallbusineestype`);
      return res;
    } catch (err) {
      throw err;
    }
  },

  getCities: async () => {
    try {
      const res = await axios.get(`${COMMON_BASE}/common/get/cities`);
      return res;
    } catch (err) {
      throw err;
    }
  },

  getCampuses: async (cityId, businessTypeId) => {
    try {
      const res = await axios.get(`${BASE_URL}/getcampus/${cityId}/${businessTypeId}`);
      return res;
    } catch (err) {
      throw err;
    }
  },
};