import React, { useState } from 'react';
import styles from './AddNewEmployeePopup.module.css';
import EmployeeCard from 'widgets/ManagerMappingAndUnmappingWidgets/EmployeeCard/EmployeeCard';
import Button from 'widgets/Button/Button';
import profilePhoto from 'assets/ManagerMappingAndUnmappingAssets/profilePhoto.svg';
import rightArrowIcon from 'assets/managermappingsearch/rightarrow.jsx';
import { advancedEmployeeSearch } from 'api/managerMapping/managerMapping';

// 🔍 Search icon
const searchIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.8132 21.1413L16.8601 15.1608C18.0877 13.5885 18.8261 11.6053
      18.8261 9.46012C18.8261 4.29553 14.6243 0.09375 9.45993 0.09375
      C4.29553 0.09375 0.09375 4.29553 0.09375 9.45993
      C0.09375 14.6153 4.29553 18.8169 9.45993 18.8169
      C11.5133 18.8169 13.405 18.1508 14.948 17.0232L20.9278 23.0119"
      fill="#818181"
    />
  </svg>
);

const AddNewEmployeePopup = ({ isOpen, onClose, onAddEmployees }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // 🔎 ENTER key search → payrollId
  const handleSearchKeyDown = async (e) => {
    if (e.key !== 'Enter') return;
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);

      const res = await advancedEmployeeSearch({
        payrollId: searchTerm.trim()
      });

      const mappedEmployees = res.map(emp => ({
        id: emp.payRollId,                 // 🔑 used for selection
        empId: emp.empId,
        name: emp.empName,
        dept: emp.departmentName,
        level: emp.employeeTypeName,
        status: emp.modeOfHiringName,
        campusId: emp.campusId,
        campusName: emp.campusName,
        cityName: emp.cityName,
        image: profilePhoto
      }));

      setEmployees(mappedEmployees);
    } catch (error) {
      console.error('Search failed', error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleEmployeeSelection = (employee) => {
    setSelectedEmployees(prev => {
      const updated = new Set(prev);
      updated.has(employee.id)
        ? updated.delete(employee.id)
        : updated.add(employee.id);
      return updated;
    });
  };

  const handleNext = () => {
    const selected = employees.filter(emp =>
      selectedEmployees.has(emp.id)
    );

    if (selected.length && onAddEmployees) {
      onAddEmployees(selected);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setSearchTerm('');
    setEmployees([]);
    setSelectedEmployees(new Set());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.addEmployeePopupOverlay} onClick={handleCancel}>
      <div
        className={styles.addEmployeePopupContent}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Search box */}
        <div className={styles.customSearchContainer}>
          <input
            type="text"
            placeholder="Search by Payroll ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className={styles.customSearchInput}
          />
          <div className={styles.customSearchIcon}>
            {searchIcon}
          </div>
        </div>

        {/* Header */}
        <div className={styles.addEmployeeSectionHeader}>
          <span className={styles.sectionTitle}>Search Results</span>
          {selectedEmployees.size > 0 && (
            <span className={styles.selectedCount}>
              {selectedEmployees.size} Selected
            </span>
          )}
        </div>

        {/* Cards */}
        <div className={styles.addEmployeeCardsGrid}>
          {loading && <p>Loading...</p>}

          {!loading && employees.length === 0 && (
            <p>No employees found</p>
          )}

          {employees.map(employee => (
            <div
              key={employee.id}
              onClick={() => toggleEmployeeSelection(employee)}
              style={{ cursor: 'pointer' }}
            >
              <EmployeeCard
                employee={employee}
                isSelected={selectedEmployees.has(employee.id)}
                onSelect={() => {}}
              />
            </div>
          ))}
        </div>

        {/* Footer buttons */}
        <div className={styles.addEmployeePopupActions}>
          <Button
            buttonname="Cancel"
            variant="secondary"
            onClick={handleCancel}
            width="113px"
          />

          <Button
            buttonname="Next"
            variant="primary"
            righticon={rightArrowIcon}
            onClick={handleNext}
            width="113px"
            disabled={selectedEmployees.size === 0}
          />
        </div>

      </div>
    </div>
  );
};

export default AddNewEmployeePopup;
