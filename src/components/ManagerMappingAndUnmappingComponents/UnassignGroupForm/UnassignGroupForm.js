import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UnassignGroupForm.module.css';
import Dropdown from 'widgets/Dropdown/Dropdown';
import Inputbox from 'widgets/Inputbox/InputBox';
import Button from 'widgets/Button/Button'; // ← Your reusable Button widget

import rightArrowIcon from 'assets/managermappingsearch/rightarrow.jsx'; // Reuse if available
import leftarrow from 'assets/EmployeeOnBoarding/leftarrow';
// Fallback inline SVG if needed

const UnassignGroupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        toDate: '',
        location: 'Hyderabad',
        manager: 'Venkat',
        reportingManager: 'Venkat',
        sharedCampuses: 'Infinity Towers',
        remarks: ''
    });

    const locations = ['Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune'];
    const campuses = ['Infinity Towers', 'Tech Park', 'Business Center', 'Corporate Hub'];
    const reportingManagers = ['Venkat', 'Vamsi Ramana', 'Raja', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai'];
    const managers = ['Venkat', 'Raja', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma'];

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
            options: campuses,
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
        },
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
        console.log('Unassign Group Form submitted:', formData);
        // Add your actual submission logic here
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.unassignGroupFormSection}>
            <h3 className={styles.unassignGroupTitle}>Un-Mapping</h3>

            <form className={styles.unassignGroupForm} onSubmit={handleSubmit}>
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
                        lefticon={leftarrow}
                        onClick={handleBack}
                        width="140px"
                    />

                    <Button
                        buttonname="Un-map"
                        type="submit"
                        variant="primary"
                        righticon={rightArrowIcon || (
                            // Fallback inline right arrow SVG
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                        width="160px"
                    />
                </div>
            </form>
        </div>
    );
};

export default UnassignGroupForm;