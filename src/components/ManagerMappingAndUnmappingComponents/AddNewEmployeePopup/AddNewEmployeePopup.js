import React, { useState, useMemo } from 'react';
import styles from './AddNewEmployeePopup.module.css';
import EmployeeCard from 'widgets/ManagerMappingAndUnmappingWidgets/EmployeeCard/EmployeeCard';
import Button from 'widgets/Button/Button';
import { generateEmployee } from '../../../utils/employeeDataGenerator';
import profilePhoto from 'assets/ManagerMappingAndUnmappingAssets/profilePhoto.svg';
import rightArrowIcon from 'assets/managermappingsearch/rightarrow.jsx';

// Magnifying glass icon on the RIGHT
const searchIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M22.8132 21.1413L22.8119 21.14L16.8601 15.1608C18.0877 13.5885 18.8261 11.6053 18.8261 9.46012C18.8261 4.29553 14.6243 0.09375 9.45993 0.09375C4.29553 0.09375 0.09375 4.29553 0.09375 9.45993C0.09375 14.6153 4.29553 18.8169 9.45993 18.8169C11.5133 18.8169 13.405 18.1508 14.948 17.0232L20.9278 23.0119L20.9285 23.0127C21.1773 23.2713 21.5233 23.3981 21.875 23.3981C22.6554 23.3981 23.1782 22.8018 23.1782 22.0675C23.1782 21.705 23.0504 21.3881 22.8132 21.1413ZM1.9948 9.45993C1.9948 5.34297 5.34278 1.9948 9.45993 1.9948C13.5769 1.9948 16.9159 5.34278 16.9159 9.45993C16.9159 13.5679 13.5769 16.9159 9.45993 16.9159C5.34278 16.9159 1.9948 13.5679 1.9948 9.45993Z" 
      fill="#818181"
      stroke="#818181" 
      strokeWidth="0.187646"
    />
  </svg>
);

const AddNewEmployeePopup = ({ isOpen, onClose, onAddEmployees }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState(new Set());

  const recentEmployees = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const emp = generateEmployee(i);
      return {
        ...emp,
        image: profilePhoto,
        dept: emp.department,
        level: emp.level,
        status: emp.type
      };
    });
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) return recentEmployees;
    const term = searchTerm.toLowerCase();
    return recentEmployees.filter(emp => 
      emp.name.toLowerCase().includes(term) ||
      emp.id.toLowerCase().includes(term) ||
      emp.dept.toLowerCase().includes(term)
    );
  }, [searchTerm, recentEmployees]);

  const toggleEmployeeSelection = (employee) => {
    setSelectedEmployees(prev => {
      const newSet = new Set(prev);
      if (newSet.has(employee.id)) {
        newSet.delete(employee.id);
      } else {
        newSet.add(employee.id);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    const selected = recentEmployees.filter(emp => selectedEmployees.has(emp.id));
    if (selected.length > 0 && onAddEmployees) {
      onAddEmployees(selected);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setSearchTerm('');
    setSelectedEmployees(new Set());
    onClose();
  };

  if (!isOpen) return null;

  const selectedCount = selectedEmployees.size;

  return (
    <div className={styles.addEmployeePopupOverlay} onClick={handleCancel}>
      <div className={styles.addEmployeePopupContent} onClick={(e) => e.stopPropagation()}>
        {/* Custom Search Input with Icon on Right */}
        <div className={styles.customSearchContainer}>
          <input
            type="text"
            placeholder="Search to add Employees for remapping"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.customSearchInput}
          />
          <div className={styles.customSearchIcon}>
            {searchIcon}
          </div>
        </div>

        <div className={styles.addEmployeeSectionHeader}>
          <span className={styles.sectionTitle}>Recent Search</span>
          {selectedCount > 0 && (
            <span className={styles.selectedCount}>{selectedCount} Selected</span>
          )}
        </div>

        <div className={styles.addEmployeeCardsGrid}>
          {filteredEmployees.map((employee) => (
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

        <div className={styles.addEmployeePopupActions}>
          <Button
            buttonname="Cancel"
            type="button"
            variant="secondary"
            onClick={handleCancel}
            width="113px"
          />

          <Button
            buttonname="Next"
            type="button"
            variant="primary"
            righticon={rightArrowIcon || (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            onClick={handleNext}
            width="113px"
            disabled={selectedCount === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewEmployeePopup;