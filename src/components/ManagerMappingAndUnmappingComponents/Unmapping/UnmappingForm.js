import React, { useState } from 'react';
import styles from '../Remapping/RemappingForm.module.css';
import Dropdown from 'widgets/Dropdown/Dropdown';
import Inputbox from 'widgets/Inputbox/InputBox';
import Button from 'widgets/Button/Button';
import conformicon from 'assets/ManagerMappingAndUnmappingAssets/conformicon';

const UnmappingForm = ({ employee }) => {
  const [formData, setFormData] = useState({
    toDate: '',
    location: 'Hyderabad',
    sharedCampuses: 'Infinity Towers',
    manager: 'Venkat',
    reportingManager: 'Venkat',
    remarks: ''
  });

  const locations = ['Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune'];
  const sharedCampuses = ['Infinity Towers', 'Tech Park', 'Business Center', 'Corporate Hub'];
  const managers = ['Venkat', 'Vamsi Ramana', 'Raja', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai'];
  const reportingManagers = ['Venkat', 'Vamsi Ramana', 'Raja', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai'];

  // Define form fields configuration
  const formFields = [
    {
      type: 'input',
      name: 'toDate',
      label: 'To Date',
      inputType: 'date',
      placeholder: 'Select Date'
    },
    {
      type: 'dropdown',
      name: 'location',
      label: 'Location',
      options: locations,
      value: formData.location
    },
    {
      type: 'dropdown',
      name: 'sharedCampuses',
      label: 'Shared Campuses',
      options: sharedCampuses,
      value: formData.sharedCampuses
    },
    {
      type: 'dropdown',
      name: 'manager',
      label: 'Manager',
      options: managers,
      value: formData.manager
    },
    {
      type: 'dropdown',
      name: 'reportingManager',
      label: 'Reporting Manager',
      options: reportingManagers,
      value: formData.reportingManager
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Unmapping form submitted:', formData);
  };

  return (
    <div className={styles.remappingFormSection}>
      <h3 className={styles.remappingTitle}>Un-Mapping</h3>
      <form className={styles.remappingForm} onSubmit={handleSubmit}>
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

        <div className={styles.formActions}>
          <Button
                buttonname="Confirm"
                type="submit"
                variant="primary"
                righticon={conformicon || (
                  // Fallback inline white checkmark in circle
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="2"/>
                    <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                width="142px" // Adjust as needed
              />
        </div>
      </form>
    </div>
  );
};

export default UnmappingForm;

