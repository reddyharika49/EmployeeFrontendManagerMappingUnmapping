import React, { useState, useEffect } from 'react';
import styles from '../Remapping/MainContentGrid.module.css';
import EmployeeDetailsCard from '../EmployeeDetailsCard/EmployeeDetailsCard';
import AddEmployeeWidget from 'widgets/ManagerMappingAndUnmappingWidgets/AddNewEmployee(Blank)/AddEmployeeWidget';
import UnmappingForm from './UnmappingForm';
import AddNewEmployeePopup from '../AddNewEmployeePopup/AddNewEmployeePopup';
import { generateEmployee } from '../../../utils/employeeDataGenerator';

// ✅ Import missing assets/utilities
import backarrow from 'assets/managermappingsearch/topleftarrow.svg';// adjust path as needed
import { useNavigate } from 'react-router-dom';

// Convert employee to grid format
const convertEmployeeToGridFormat = (emp, idx) => {
  const reportingManagers = ['Vamsi Ramana', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma', 'Lakshmi Nair'];
  const managers = ['Raja', 'Venkat', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma'];
  const managerIndex = idx % managers.length;
  const reportingManagerIndex = idx % reportingManagers.length;

  return {
    id: emp.id || `HYD ${String(5627182 + idx).padStart(7, '0')}`,
    name: emp.name || emp.employeeName || 'Unknown',
    department: emp.dept || emp.department || 'IT Cell',
    level: emp.level || 'Level 4',
    type: emp.status || emp.type || 'Permanent',
    campus: {
      name: 'Name Of The Campus',
      address: 'Infinity Towers, Plot No 2-91/31, Near N Convention Road, HITEC City, Hyderabad, Telangana 500081'
    },
    reportingManager: reportingManagers[reportingManagerIndex],
    manager: managers[managerIndex],
    project: 'IPL'
  };
};

const UnmappingContentGrid = ({ initialEmployees = [] }) => {
  const navigate = useNavigate();

  // Initialize with provided employees or default to one generated employee
  const initialEmployeesFormatted = initialEmployees.length > 0
    ? initialEmployees.map((emp, idx) => convertEmployeeToGridFormat(emp, idx))
    : [generateEmployee(0)];

  const [employees, setEmployees] = useState(initialEmployeesFormatted);
  const [isAddEmployeePopupOpen, setIsAddEmployeePopupOpen] = useState(false);

  // Update employees when initialEmployees prop changes
  useEffect(() => {
    if (initialEmployees.length > 0) {
      const formatted = initialEmployees.map((emp, idx) => convertEmployeeToGridFormat(emp, idx));
      setEmployees(formatted);
    }
  }, [initialEmployees]);

  const handleAddEmployeeClick = () => {
    setIsAddEmployeePopupOpen(true);
  };

  const handleAddEmployees = (selectedEmployees) => {
    const reportingManagers = ['Vamsi Ramana', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma', 'Lakshmi Nair'];
    const managers = ['Raja', 'Venkat', 'Kavitha Rao', 'Ramesh Iyer', 'Sunita Desai', 'Amit Verma'];

    const newEmployees = selectedEmployees.map((emp, idx) => {
      const managerIndex = (employees.length + idx) % managers.length;
      const reportingManagerIndex = (employees.length + idx) % reportingManagers.length;

      return {
        id: emp.id,
        name: emp.name,
        department: emp.dept,
        level: emp.level,
        type: emp.status,
        campus: {
          name: 'Name Of The Campus',
          address: 'Infinity Towers, Plot No 2-91/31, Near N Convention Road, HITEC City, Hyderabad, Telangana 500081'
        },
        reportingManager: reportingManagers[reportingManagerIndex],
        manager: managers[managerIndex],
        project: 'IPL'
      };
    });
    setEmployees([...employees, ...newEmployees]);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.mainContentGrid}>
      <div className={styles.topRow}>
        <img src={backarrow} alt="back" className={styles.backIcon} onClick={goBack} />
        <div className={styles.modeheader}>
          <h2 className={styles.title}>Unmap Employees</h2>
          <p className={styles.subtitle}>Unmap each of employees</p>
        </div>
      </div>
      <div className={styles.employeeGrid}>
     
        {employees.map((employee, index) => (
          <div key={employee.id || index} className={styles.gridColumn}>
            <EmployeeDetailsCard employee={employee} />
            <UnmappingForm employee={employee} />
          </div>
        ))}

        <div className={styles.gridColumn}>
          <AddEmployeeWidget onClick={handleAddEmployeeClick} />
        </div>
      
      </div>
      <AddNewEmployeePopup
        isOpen={isAddEmployeePopupOpen}
        onClose={() => setIsAddEmployeePopupOpen(false)}
        onAddEmployees={handleAddEmployees}
      />
    
    </div>
  );
};

export default UnmappingContentGrid;