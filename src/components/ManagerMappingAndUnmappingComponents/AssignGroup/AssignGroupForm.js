import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AssignGroupForm.module.css';
import Dropdown from 'widgets/Dropdown/Dropdown';
import Inputbox from 'widgets/Inputbox/InputBox';
import Button from 'widgets/Button/Button'; // ← Added your Button widget

import iconSvg from 'assets/ManagerMappingAndUnmappingAssets/icon.svg';
import rightArrowIcon from 'assets/managermappingsearch/rightarrow.jsx'; // ← Reuse your existing right arrow if available
import leftarrow from 'assets/EmployeeOnBoarding/leftarrow';
// If you don't have a reusable right arrow SVG component, we'll use inline SVG below

const AssignGroupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: 'Hyderabad',
    campus: 'Infinity Towers',
    department: 'Senior Faculty',
    position: 'Senior Faculty',
    manager: 'Venkat',
    reportingManager: 'Venkat',
    workingStartDate: '',
    remarks: ''
  });

  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const [campusIdCounter, setCampusIdCounter] = useState(1);

  const locations = ['Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune'];
  const campuses = ['Infinity Towers', 'Tech Park', 'Business Center', 'Corporate Hub'];
  const departments = ['Senior Faculty', 'IT Cell', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales', 'Engineering', 'Support'];
  const positions = ['Senior Faculty', 'Software Engineer', 'Senior Software Engineer', 'Team Lead', 'Manager', 'Senior Manager', 'Director', 'Associate', 'Analyst'];
  const reportingManagers = ['Venkat', 'Vamsi Ramana', 'Raja', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai'];
  const managers = ['Venkat', 'Raja', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma'];

  const formFields = [
    { type: 'dropdown', name: 'location', label: 'Location', options: locations, value: formData.location },
    { type: 'dropdown', name: 'campus', label: 'Campus', options: campuses, value: formData.campus },
    { type: 'dropdown', name: 'department', label: 'Department', options: departments, value: formData.department },
    { type: 'dropdown', name: 'position', label: 'Position', options: positions, value: formData.position },
    { type: 'dropdown', name: 'manager', label: 'Manager', options: managers, value: formData.manager },
    { type: 'dropdown', name: 'reportingManager', label: 'Reporting Manager', options: reportingManagers, value: formData.reportingManager },
    { type: 'input', name: 'workingStartDate', label: 'Working Start Date', inputType: 'date', placeholder: 'Select Date' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'campus' && value) {
      const campusExists = selectedCampuses.some(c => c.name === value);
      if (!campusExists) {
        setSelectedCampuses(prev => [...prev, { id: campusIdCounter, name: value }]);
        setCampusIdCounter(prev => prev + 1);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Assign Group Form submitted:', formData, { selectedCampuses });
    // Add your actual submission logic here
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRemoveCampus = (id) => {
    setSelectedCampuses(prev => prev.filter(campus => campus.id !== id));
  };

  return (
    <div className={styles.assignGroupFormSection}>
      <h3 className={styles.assignGroupTitle}>Re-Mapping</h3>

      <form className={styles.assignGroupForm} onSubmit={handleSubmit}>
        <div className={styles.formFieldsGrid}>
          {formFields.map((field) => (
            <div key={field.name} className={styles.formGroup}>
              {field.type === 'dropdown' ? (
                <Dropdown
                  dropdownname={field.label}
                  results={field.options}
                  value={field.value}
                  name={field.name}
                  onChange={handleInputChange}
                  dropdownsearch={false}
                />
              ) : (
                <Inputbox
                  label={field.label}
                  id={field.name}
                  name={field.name}
                  type={field.inputType}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  inputRule="none"
                />
              )}
            </div>
          ))}
        </div>

        <div className={styles.selectedCampusesSection}>
          <label className={styles.selectedCampusesLabel}>Selected Campuses</label>
          <div className={styles.selectedCampusesList}>
            {selectedCampuses.length === 0 ? (
              <div className={styles.emptyCampusState}>
                <div className={styles.emptyCampusIcon}>
                  <img src={iconSvg} alt="Campus Icon" />
                </div>
                <p className={styles.emptyCampusText}>You Haven't Selected any campus Yet</p>
              </div>
            ) : (
              selectedCampuses.map(campus => (
                <div key={campus.id} className={styles.campusChip}>
                  <div className={styles.campusChipIcon}>
                    <img src={iconSvg} alt="Campus Icon" />
                  </div>
                  <div className={styles.campusChipContent}>
                    <div className={styles.campusChipLabel}>Campus Name</div>
                    <div className={styles.campusChipName}>{campus.name}</div>
                  </div>
                  <button
                    type="button"
                    className={styles.campusChipClose}
                    onClick={() => handleRemoveCampus(campus.id)}
                    aria-label="Remove campus"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="remarks">Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            placeholder="Enter Remarks"
            rows="4"
          />
        </div>

        {/* Replaced manual buttons with your Button widget */}
        <div className={styles.formActions}>
          <Button
            buttonname="Back"
            type="button"
            variant="secondary"
            lefticon={leftarrow} // Your back arrow SVG
            onClick={handleBack}
            width="140px"
          />

          <Button
            buttonname="Re-Map"
            type="submit"
            variant="primary"
            righticon={rightArrowIcon || (
              // Fallback inline arrow if rightarrow.jsx not available
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            width="160px"
          />
        </div>
      </form>
    </div>
  );
};

export default AssignGroupForm;