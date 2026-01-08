import React, { useEffect, useState } from "react";
import styles from "./FilterDropdown.module.css";

import bluefilterline from "assets/managermappingsearch/bluefilterline.svg";
import Button from "widgets/Button/Button";
import Dropdown from "widgets/Dropdown/Dropdown";
import FilterSection from "./FliterSection";

import {
  getStates,
  getCitiesByStateId,
  getCampusesByCityId,
  getEmployeeTypes,
  getDepartmentsByEmpType
} from "api/managerMapping/managerMapping";

const FilterDropdown = ({ isOpen, onApplyFilters }) => {

  /* ================= SECTION STATE ================= */
  const [sections, setSections] = useState({
    location: { expanded: false, closing: false },
    campus: { expanded: false, closing: false },
    empType: { expanded: false, closing: false },
    department: { expanded: false, closing: false },
  });

  /* ================= API DATA ================= */
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [departments, setDepartments] = useState([]);

  /* ================= FILTER VALUES ================= */
  const [filters, setFilters] = useState({
    state: null,
    city: null,
    campus: null,
    empType: null,
    department: "",
  });

  /* ================= FETCH STATES ================= */
  useEffect(() => {
    fetchStates();
    fetchEmployeeTypes();
  }, []);

  const fetchStates = async () => {
    const res = await getStates();
    setStates(res || []);
  };

  /* ================= FETCH CITIES ================= */
  const fetchCities = async (stateId) => {
    const res = await getCitiesByStateId(stateId);
    setCities(res || []);
  };

  /* ================= FETCH CAMPUSES ================= */
  const fetchCampuses = async (cityId) => {
    const res = await getCampusesByCityId(cityId);
    console.log("CAMPUSES API RESPONSE:", res);
    setCampuses(res || []);
  };

 /* ================= FETCH EMPLOYEES ================= */
  
  const fetchEmployeeTypes = async () => {
    const res = await getEmployeeTypes();
    console.log("EMPLOYEE TYPES API RESPONSE:", res);
    setEmployeeTypes(res || []);
  };

 /* ================= FETCH Departments ================= */
 
  const fetchDepartments = async (empTypeId) => {
    const res = await getDepartmentsByEmpType(empTypeId);
    setDepartments(res || []);
  };
  

  /* ================= SECTION TOGGLE ================= */
  const closeSection = (key) => {
    setSections(prev => ({
      ...prev,
      [key]: { ...prev[key], closing: true }
    }));

    setTimeout(() => {
      setSections(prev => ({
        ...prev,
        [key]: { expanded: false, closing: false }
      }));
    }, 300);
  };

  const toggleSection = (key) => {
    if (sections[key].expanded) {
      closeSection(key);
    } else {
      Object.keys(sections).forEach(sec => {
        if (sections[sec].expanded) closeSection(sec);
      });

      setSections(prev => ({
        ...prev,
        [key]: { expanded: true, closing: false }
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.dropdownWrapper}>

      <figure className={styles.topDecoration}>
        <img src={bluefilterline} alt="decorative line" />
      </figure>

      {/* ================= LOCATION ================= */}
      <FilterSection
        title="Location"
        sectionKey="location"
        sections={sections}
        toggleSection={toggleSection}
      >

        {/* STATE */}
        <div className={styles.dropdownContainer}>
          <Dropdown
            dropdownname="State"
            placeholder="Select State"
            dropdownsearch
            results={states.map(s => s.name)}
            value={filters.state?.name || ""}
            onChange={(e) => {
              const selectedState = states.find(
                s => s.name === e.target.value
              );

              setFilters(prev => ({
                ...prev,
                state: selectedState || null,
                city: null,
                campus: null
              }));

              setCities([]);
              setCampuses([]);

              if (selectedState) {
                fetchCities(selectedState.id);
              }
            }}
          />
        </div>

        {/* CITY */}
        <div className={styles.dropdownContainer}>
          <Dropdown
            dropdownname="City"
            placeholder="Select City"
            dropdownsearch
            results={cities.map(c => c.cityName)}
            value={filters.city?.cityName || ""}
            onChange={(e) => {
              const selectedCity = cities.find(
                c => c.cityName === e.target.value
              );

              setFilters(prev => ({
                ...prev,
                city: selectedCity
                  ? {
                      cityId: selectedCity.cityId,
                      cityName: selectedCity.cityName
                    }
                  : null,
                campus: null
              }));

              setCampuses([]);

              if (selectedCity) {
                fetchCampuses(selectedCity.cityId);
              }
            }}
          />
        </div>

      </FilterSection>

      {/* ================= CAMPUS ================= */}
      <FilterSection
        title="Campus"
        sectionKey="campus"
        sections={sections}
        toggleSection={toggleSection}
      >
        <div className={styles.dropdownContainer}>
          <Dropdown
            dropdownname="Campus"
            placeholder="Select Campus"
            dropdownsearch
            results={campuses.map(c => c.name)}
            value={filters.campus?.campusName || ""}
            onChange={(e) => {
              const selectedCampus = campuses.find(
                c => c.name === e.target.value
              );

              setFilters(prev => ({
                ...prev,
                campus: selectedCampus
                  ? {
                      campusId: selectedCampus.id,
                      campusName: selectedCampus.name
                    }
                  : null
              }));
            }}
          />
        </div>
      </FilterSection>

      {/* ================= EMPLOYEE TYPE ================= */}
      <FilterSection
  title="Employee Type"
  sectionKey="empType"
  sections={sections}
  toggleSection={toggleSection}
>
  <div className={styles.dropdownContainer}>
    <Dropdown
      dropdownname="Employee Type"
      placeholder="Select Employee Type"
      dropdownsearch
      results={employeeTypes.map(et => et.name)}
      value={filters.empType?.name || ""}
      onChange={(e) => {
        const selectedType = employeeTypes.find(
          et => et.name === e.target.value
        );

        setFilters(prev => ({
          ...prev,
          empType: selectedType
            ? {
                empTypeId: selectedType.id,
                name: selectedType.name
              }
            : null,
          department: null
        }));

        setDepartments([]);

        if (selectedType) {
          fetchDepartments(selectedType.id);
        }
      }}
    />
  </div>
</FilterSection>


      {/* ================= DEPARTMENT ================= */}
      <FilterSection
  title="Department"
  sectionKey="department"
  sections={sections}
  toggleSection={toggleSection}
>
  <div className={styles.dropdownContainer}>
    <Dropdown
      dropdownname="Department"
      placeholder="Select Department"
      dropdownsearch
      results={departments.map(dep => dep.name)}
      value={filters.department?.name || ""}
      onChange={(e) => {
        const selectedDept = departments.find(
          d => d.name === e.target.value
        );

        setFilters(prev => ({
          ...prev,
          department: selectedDept
            ? {
                departmentId: selectedDept.id,
                name: selectedDept.name
              }
            : null
        }));
      }}
    />
  </div>
</FilterSection>

      <div className={styles.buttonWrapper}>
        <Button
          buttonname="Search"
          variant="primary"
          width="150px"
          onClick={() => onApplyFilters(filters)}
        />
      </div>

    </div>
  );
};

export default FilterDropdown;
