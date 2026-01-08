// components/EmployeeModuleHeader/EmployeeModuleHeaderSearch.js
import React, { useState, useRef, useEffect } from "react";
import styles from "./ManagerMappingHeaderSearch.module.css";
import FilterDropdown from "./FilterDropdown";
import ApplicationSearchBar from "widgets/application-search-bar-component/ApplicationSearchBar";
import { useNavigate } from "react-router-dom";

const EmployeeModuleHeaderSearch = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");


  const handleSearchIconClick = () => {
    setIsFilterOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  

  return (
    <div ref={searchRef} className={styles.searchContainerWithDropdown}>

      <ApplicationSearchBar
        placeholderText="Search for Employee Name / Payroll ID"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onClick={handleSearchIconClick}
        customClass={styles.search_bar_zindex}
      />

      <FilterDropdown
        isOpen={isFilterOpen}
        onApplyFilters={(filters) => {
          setIsFilterOpen(false);
        
          const hasFilters = Object.values(filters || {}).some(v => v);
        
          navigate("/scopes/employee/employeeManager/search-results", {
            state: {
              filters,
              payrollId: searchText?.trim() || null,
              searchMode: hasFilters ? "FILTER" : "PAYROLL"
            }
          });
        }}
        
      />

      {isFilterOpen && (
        <div
          className={styles.backdrop_overlay}
          onClick={() => setIsFilterOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default EmployeeModuleHeaderSearch;
